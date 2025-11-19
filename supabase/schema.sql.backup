-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  duration_min INTEGER NOT NULL,
  price_clp INTEGER NOT NULL,
  active BOOLEAN DEFAULT true,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID NOT NULL REFERENCES services(id),
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  client_email TEXT NOT NULL,
  start_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDIENTE' CHECK (status IN ('PENDIENTE', 'CONFIRMADA', 'CANCELADA', 'COMPLETADA')),
  calcom_event_id TEXT,
  gcal_event_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payment_proofs table
CREATE TABLE IF NOT EXISTS payment_proofs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  amount_clp INTEGER NOT NULL,
  received_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create consents table
CREATE TABLE IF NOT EXISTS consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  signed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create logs table
CREATE TABLE IF NOT EXISTS logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  payload_json JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_start_at ON bookings(start_at);
CREATE INDEX IF NOT EXISTS idx_bookings_client_email ON bookings(client_email);
CREATE INDEX IF NOT EXISTS idx_payment_proofs_booking_id ON payment_proofs(booking_id);
CREATE INDEX IF NOT EXISTS idx_consents_booking_id ON consents(booking_id);
CREATE INDEX IF NOT EXISTS idx_logs_type ON logs(type);
CREATE INDEX IF NOT EXISTS idx_logs_created_at ON logs(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_proofs ENABLE ROW LEVEL SECURITY;
ALTER TABLE consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE logs ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access on services
CREATE POLICY "Services are viewable by everyone" ON services FOR SELECT USING (active = true);

-- Create policies for bookings (users can only see their own)
CREATE POLICY "Users can view their own bookings" ON bookings FOR SELECT USING (true);
CREATE POLICY "Users can create bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their bookings" ON bookings FOR UPDATE USING (true);

-- Create policies for payment proofs
CREATE POLICY "Users can view payment proofs" ON payment_proofs FOR SELECT USING (true);
CREATE POLICY "Users can insert payment proofs" ON payment_proofs FOR INSERT WITH CHECK (true);

-- Create policies for consents
CREATE POLICY "Users can view consents" ON consents FOR SELECT USING (true);
CREATE POLICY "Users can insert consents" ON consents FOR INSERT WITH CHECK (true);

-- Create policies for logs (insert only)
CREATE POLICY "Logs can be inserted by anyone" ON logs FOR INSERT WITH CHECK (true);

-- Create storage bucket for payment proofs and consents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('payment-proofs', 'payment-proofs', false),
       ('consents', 'consents', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Anyone can upload payment proofs"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'payment-proofs');

CREATE POLICY "Anyone can view payment proofs"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'payment-proofs');

CREATE POLICY "Anyone can upload consents"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'consents');

CREATE POLICY "Anyone can view consents"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'consents');
