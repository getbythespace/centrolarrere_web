import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
// import { Resend } from 'resend';
import { Database } from '@/lib/database.types';

// const resend = new Resend(process.env.RESEND_API_KEY);

type BookingWithService = Database['public']['Tables']['bookings']['Row'] & {
  services: Database['public']['Tables']['services']['Row'];
};

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const bookingId = id;

    // Get booking with service details
    const { data: booking, error: fetchError } = await supabaseAdmin
      .from('bookings')
      .select('*, services(*)')
      .eq('id', bookingId)
      .single() as { data: BookingWithService | null; error: any };

    if (fetchError || !booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Update booking status to CONFIRMADA
    const { error: updateError } = await (supabaseAdmin
      .from('bookings') as any)
      .update({
        status: 'CONFIRMADA',
        updated_at: new Date().toISOString(),
      })
      .eq('id', bookingId);

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to update booking' },
        { status: 500 }
      );
    }

    // Send confirmation email to client
    // TODO: Configure Resend API key to enable email notifications
    /*
    const startDate = new Date(booking.start_at);
    await resend.emails.send({
      from: 'LARRERE <reservas@larrere.cl>',
      to: booking.client_email,
      subject: '✅ Reserva Confirmada - LARRERE',
      html: `
        <h2>Listo, ${booking.client_name} 🙌</h2>
        <p>Tu cita <strong>${booking.services?.name}</strong> está confirmada para:</p>
        <p style="font-size: 18px; font-weight: bold;">
          ${startDate.toLocaleDateString('es-CL', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })} a las ${startDate.toLocaleTimeString('es-CL', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
        
        <h3>Ubicación:</h3>
        <p>
          Calle Principal 123<br/>
          Comuna, Ciudad<br/>
          <a href="https://maps.google.com/?q=LARRERE">Ver en Google Maps</a>
        </p>
        
        <h3>Preparativos:</h3>
        <ul>
          <li>Llegar 5-10 minutos antes de tu hora</li>
          <li>Traer documento de identidad</li>
          <li>Ropa cómoda (si aplica)</li>
        </ul>
        
        <p><strong>¿Necesitas reprogramar?</strong><br/>
        Puedes hacerlo sin costo con al menos 12h de anticipación.</p>
        
        <p>¡Nos vemos!<br/>LARRERE</p>
      `,
    });
    */

    // Schedule reminder emails (24h and 4h before)
    // This would typically be done with a cron job or scheduled task
    // For now, we'll trigger the Make.com webhook to handle this
    if (process.env.MAKE_WEBHOOK_URL) {
      await fetch(process.env.MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'booking.approved',
          booking_id: bookingId,
          client: {
            name: booking.client_name,
            email: booking.client_email,
            phone: booking.client_phone,
          },
          appointment_time: booking.start_at,
          service: booking.services?.name,
        }),
      });
    }

    // Log the approval
    await (supabaseAdmin.from('logs') as any).insert({
      type: 'booking_approved',
      payload_json: {
        booking_id: bookingId,
        approved_at: new Date().toISOString(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Booking approved and confirmation sent',
    });
  } catch (error) {
    console.error('Booking approval error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
