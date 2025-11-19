import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    
    // Log the webhook event
    await (supabaseAdmin.from('logs') as any).insert({
      type: 'calcom_webhook',
      payload_json: payload,
    });

    // Handle booking.created event
    if (payload.triggerEvent === 'BOOKING_CREATED') {
      const { uid, title, startTime, attendees, metadata } = payload;
      
      const attendee = attendees?.[0];
      if (!attendee) {
        return NextResponse.json({ error: 'No attendee found' }, { status: 400 });
      }

      // Create booking in database with PENDIENTE status
      const { data: booking, error: bookingError } = await (supabaseAdmin
        .from('bookings') as any)
        .insert({
          client_name: attendee.name,
          client_email: attendee.email,
          client_phone: attendee.phoneNumber || '',
          start_at: startTime,
          status: 'PENDIENTE',
          calcom_event_id: uid,
          service_id: metadata?.serviceId || '00000000-0000-0000-0000-000000000000', // Default service
        })
        .select()
        .single();

      if (bookingError) {
        console.error('Error creating booking:', bookingError);
        return NextResponse.json({ error: bookingError.message }, { status: 500 });
      }

      // Send email with payment instructions
      // TODO: Configure Resend API key in .env.local to enable email notifications
      /*
      const paymentLink = `${process.env.NEXT_PUBLIC_SITE_URL}/comprobante/${booking.id}`;
      
      await resend.emails.send({
        from: 'LARRERE <reservas@larrere.cl>',
        to: attendee.email,
        subject: 'Instrucciones para confirmar tu reserva',
        html: `
          <h2>Hola, ${attendee.name}</h2>
          <p>Recibimos tu solicitud para <strong>${title}</strong> el <strong>${new Date(startTime).toLocaleString('es-CL')}</strong>.</p>
          
          <h3>Para confirmar tu cita:</h3>
          <ol>
            <li>Transfiere el 50% del valor (abono) a:
              <ul>
                <li><strong>Banco:</strong> ${process.env.BANK_NAME}</li>
                <li><strong>Cuenta:</strong> ${process.env.ACCOUNT_NUMBER}</li>
                <li><strong>Titular:</strong> ${process.env.ACCOUNT_HOLDER}</li>
                <li><strong>RUT:</strong> ${process.env.ACCOUNT_RUT}</li>
              </ul>
            </li>
            <li>Sube tu comprobante aquí: <a href="${paymentLink}">${paymentLink}</a></li>
            <li>Tienes ${process.env.PAYMENT_TIMEOUT_MINUTES || 60} minutos para completar este paso</li>
          </ol>
          
          <p><strong>Política de cancelación:</strong></p>
          <ul>
            <li>Cancelaciones con ≥12h de anticipación: sin cargo</li>
            <li>Cancelaciones con <12h o no-show: se pierde la hora</li>
          </ul>
          
          <p>Saludos,<br/>LARRERE</p>
        `,
      });

      // Notify admin
      await resend.emails.send({
        from: 'LARRERE Sistema <sistema@larrere.cl>',
        to: process.env.ADMIN_EMAIL!,
        subject: 'Nueva reserva pendiente de pago',
        html: `
          <h3>Nueva reserva creada</h3>
          <p><strong>Cliente:</strong> ${attendee.name}</p>
          <p><strong>Email:</strong> ${attendee.email}</p>
          <p><strong>Servicio:</strong> ${title}</p>
          <p><strong>Fecha:</strong> ${new Date(startTime).toLocaleString('es-CL')}</p>
          <p><strong>Estado:</strong> PENDIENTE DE PAGO</p>
          <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/booking/${booking.id}">Ver reserva</a></p>
        `,
      });
      */

      return NextResponse.json({ success: true, bookingId: booking.id });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Cal.com webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
