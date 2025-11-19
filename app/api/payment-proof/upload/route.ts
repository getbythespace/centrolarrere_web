import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const bookingId = formData.get('bookingId') as string;
    const file = formData.get('file') as File;
    const amount = formData.get('amount') as string;
    
    if (!bookingId || !file || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get booking details
    const { data: booking, error: bookingError } = await supabaseAdmin
      .from('bookings')
      .select('*, services(*)')
      .eq('id', bookingId)
      .single() as { data: any; error: any };

    if (bookingError || !booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Upload file to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${bookingId}-${Date.now()}.${fileExt}`;
    const filePath = `payment-proofs/${fileName}`;

    const fileBuffer = await file.arrayBuffer();
    const { data: uploadData, error: uploadError } = await supabaseAdmin
      .storage
      .from('payment-proofs')
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json(
        { error: 'Failed to upload file' },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin
      .storage
      .from('payment-proofs')
      .getPublicUrl(filePath);

    // Save payment proof record
    const { data: paymentProof, error: proofError } = await (supabaseAdmin
      .from('payment_proofs') as any)
      .insert({
        booking_id: bookingId,
        file_url: urlData.publicUrl,
        amount_clp: parseInt(amount),
      })
      .select()
      .single();

    if (proofError) {
      return NextResponse.json(
        { error: 'Failed to save payment proof' },
        { status: 500 }
      );
    }

    // Send confirmation email to client
    // TODO: Configure Resend API key to enable email notifications
    /*
    await resend.emails.send({
      from: 'LARRERE <reservas@larrere.cl>',
      to: booking.client_email,
      subject: 'Comprobante recibido - En revisión',
      html: `
        <h2>¡Gracias, ${booking.client_name}!</h2>
        <p>Recibimos tu comprobante de pago.</p>
        <p>Te confirmaremos por este medio en breve una vez revisado.</p>
        <p>Saludos,<br/>LARRERE</p>
      `,
    });

    // Notify admin with approval link
    const approvalLink = `${process.env.NEXT_PUBLIC_SITE_URL}/admin/booking/${bookingId}`;
    await resend.emails.send({
      from: 'LARRERE Sistema <sistema@larrere.cl>',
      to: process.env.ADMIN_EMAIL!,
      subject: 'Nuevo comprobante de pago recibido',
      html: `
        <h3>Comprobante de pago recibido</h3>
        <p><strong>Cliente:</strong> ${booking.client_name}</p>
        <p><strong>Email:</strong> ${booking.client_email}</p>
        <p><strong>Fecha cita:</strong> ${new Date(booking.start_at).toLocaleString('es-CL')}</p>
        <p><strong>Monto:</strong> $${parseInt(amount).toLocaleString('es-CL')}</p>
        <p><strong>Comprobante:</strong> <a href="${urlData.publicUrl}">Ver comprobante</a></p>
        <p><a href="${approvalLink}"><strong>APROBAR RESERVA</strong></a></p>
      `,
    });
    */

    // Log the event
    await (supabaseAdmin.from('logs') as any).insert({
      type: 'payment_proof_uploaded',
      payload_json: {
        booking_id: bookingId,
        payment_proof_id: paymentProof.id,
        amount: amount,
      },
    });

    // Trigger Make.com webhook if configured
    if (process.env.MAKE_WEBHOOK_URL) {
      const approvalLink = `${process.env.NEXT_PUBLIC_SITE_URL}/admin/booking/${bookingId}`;
      await fetch(process.env.MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'payment_proof.uploaded',
          booking_id: bookingId,
          payment_proof_id: paymentProof.id,
          client: {
            name: booking.client_name,
            email: booking.client_email,
          },
          approval_url: approvalLink,
        }),
      });
    }

    return NextResponse.json({
      success: true,
      paymentProofId: paymentProof.id,
    });
  } catch (error) {
    console.error('Payment proof upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
