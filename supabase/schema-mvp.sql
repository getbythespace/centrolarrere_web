-- =====================================================
-- LARRÈRE MVP - Schema Evolutivo
-- Mantiene compatibilidad + agrega funcionalidad clínica
-- =====================================================

-- =====================================================
-- NUEVAS TABLAS PARA MVP CLÍNICO
-- =====================================================

-- Tabla de pacientes (nuevo concepto clínico)
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_patients_phone ON patients(phone);
CREATE INDEX IF NOT EXISTS idx_patients_email ON patients(email);

-- Planes de tratamiento (nuevo)
CREATE TABLE IF NOT EXISTS treatment_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE RESTRICT,
  total_sessions INTEGER NOT NULL CHECK (total_sessions > 0),
  completed_sessions INTEGER DEFAULT 0 CHECK (completed_sessions >= 0),
  status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'PAUSED', 'COMPLETED')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT sessions_valid CHECK (completed_sessions <= total_sessions)
);

CREATE INDEX IF NOT EXISTS idx_treatment_plans_patient ON treatment_plans(patient_id);
CREATE INDEX IF NOT EXISTS idx_treatment_plans_status ON treatment_plans(status);

-- Ajustes de planes (auditoría de cambios manuales)
CREATE TABLE IF NOT EXISTS plan_adjustments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID NOT NULL REFERENCES treatment_plans(id) ON DELETE CASCADE,
  delta INTEGER NOT NULL CHECK (delta != 0),
  reason TEXT NOT NULL,
  admin_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_plan_adjustments_plan ON plan_adjustments(plan_id);

-- =====================================================
-- MEJORAS A TABLAS EXISTENTES
-- =====================================================

-- Agregar campos a services (sin eliminar price_clp por compatibilidad)
ALTER TABLE services ADD COLUMN IF NOT EXISTS requires_medical_eval BOOLEAN DEFAULT false;

-- Agregar campos a bookings para sistema HOLD
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS patient_id UUID REFERENCES patients(id) ON DELETE SET NULL;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS attended BOOLEAN DEFAULT false;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS treatment_plan_id UUID REFERENCES treatment_plans(id) ON DELETE SET NULL;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS notes TEXT;

-- Actualizar constraint de status para incluir HOLD y EXPIRED
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_status_check;
ALTER TABLE bookings ADD CONSTRAINT bookings_status_check 
  CHECK (status IN ('PENDIENTE', 'HOLD', 'CONFIRMADA', 'CANCELADA', 'COMPLETADA', 'EXPIRED', 'NO_SHOW'));

CREATE INDEX IF NOT EXISTS idx_bookings_patient ON bookings(patient_id);
CREATE INDEX IF NOT EXISTS idx_bookings_expires_at ON bookings(expires_at) WHERE status = 'HOLD';
CREATE INDEX IF NOT EXISTS idx_bookings_plan ON bookings(treatment_plan_id);

-- =====================================================
-- FUNCIONES ÚTILES
-- =====================================================

-- Auto-actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
DROP TRIGGER IF EXISTS update_patients_updated_at ON patients;
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_treatment_plans_updated_at ON treatment_plans;
CREATE TRIGGER update_treatment_plans_updated_at BEFORE UPDATE ON treatment_plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (nuevas tablas)
-- =====================================================

ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE treatment_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE plan_adjustments ENABLE ROW LEVEL SECURITY;

-- Políticas permisivas para MVP (refinar después con auth)
CREATE POLICY "Service role full access patients" ON patients FOR ALL USING (true);
CREATE POLICY "Service role full access treatment_plans" ON treatment_plans FOR ALL USING (true);
CREATE POLICY "Service role full access plan_adjustments" ON plan_adjustments FOR ALL USING (true);

-- =====================================================
-- SEED DATA - Servicios de LARRÈRE
-- =====================================================

-- Limpiar servicios demo si existen
DELETE FROM services WHERE name IN ('Masaje Relajante', 'Tratamiento Facial');

-- Insertar servicios reales de LARRÈRE (sin precios por ahora, usamos 0)
INSERT INTO services (name, description, duration_min, price_clp, active, requires_medical_eval) VALUES
  (
    'Evaluación Médica Inicial',
    'Consulta completa con evaluación médica para determinar el tratamiento más adecuado según tus necesidades. Incluye análisis de piel, historial clínico y recomendaciones personalizadas.',
    60,
    0,
    true,
    false
  ),
  (
    'Depilación Láser Diodo',
    'Tratamiento de depilación definitiva mediante tecnología láser de diodo de última generación. Seguro, efectivo y prácticamente indoloro. Requiere múltiples sesiones según zona.',
    45,
    0,
    true,
    false
  ),
  (
    'Limpieza Facial Profunda',
    'Limpieza facial profunda con extracción de impurezas, exfoliación, hidratación y mascarilla personalizada según tipo de piel. Deja tu piel renovada y luminosa.',
    60,
    0,
    true,
    false
  ),
  (
    'Peeling Químico',
    'Exfoliación química controlada para mejorar textura, manchas, cicatrices de acné y signos de envejecimiento. Diferentes intensidades según necesidad.',
    45,
    0,
    true,
    true
  ),
  (
    'Láser CO₂ Fraccionado',
    'Tratamiento avanzado para rejuvenecimiento, cicatrices de acné, manchas y arrugas profundas. Requiere evaluación médica previa y cuidados post-procedimiento.',
    60,
    0,
    true,
    true
  ),
  (
    'Láser Vascular',
    'Tratamiento especializado para várices, arañitas vasculares, rosácea y manchas vasculares. Tecnología selectiva que actúa sobre los vasos sanguíneos.',
    45,
    0,
    true,
    true
  ),
  (
    'Hidratación Facial',
    'Tratamiento intensivo de hidratación profunda con ácido hialurónico, vitaminas y antioxidantes. Ideal para pieles deshidratadas y cansadas.',
    45,
    0,
    true,
    false
  ),
  (
    'Masaje Relajante',
    'Masaje terapéutico de cuerpo completo para aliviar tensiones, mejorar circulación y promover bienestar general. Técnicas personalizadas.',
    60,
    0,
    true,
    false
  ),
  (
    'Radiofrecuencia Facial',
    'Tratamiento no invasivo para rejuvenecimiento, reafirmación y reducción de flacidez facial. Estimula producción de colágeno naturalmente.',
    50,
    0,
    true,
    false
  ),
  (
    'Microdermoabrasión',
    'Exfoliación mecánica suave para renovación celular, mejora de textura y luminosidad. Ideal para mantenimiento regular.',
    40,
    0,
    true,
    false
  )
ON CONFLICT DO NOTHING;

-- =====================================================
-- VISTAS ÚTILES PARA EL ADMIN
-- =====================================================

-- Vista: Reservas de hoy
CREATE OR REPLACE VIEW bookings_today AS
SELECT 
  b.*,
  s.name as service_name,
  p.full_name as patient_name,
  p.phone as patient_phone
FROM bookings b
LEFT JOIN services s ON b.service_id = s.id
LEFT JOIN patients p ON b.patient_id = p.id
WHERE DATE(b.start_at AT TIME ZONE 'America/Santiago') = CURRENT_DATE
ORDER BY b.start_at;

-- Vista: Planes activos con progreso
CREATE OR REPLACE VIEW active_plans_summary AS
SELECT 
  tp.*,
  p.full_name as patient_name,
  p.phone as patient_phone,
  s.name as service_name,
  (tp.total_sessions - tp.completed_sessions) as remaining_sessions,
  ROUND((tp.completed_sessions::decimal / tp.total_sessions) * 100, 2) as progress_percent
FROM treatment_plans tp
JOIN patients p ON tp.patient_id = p.id
JOIN services s ON tp.service_id = s.id
WHERE tp.status = 'ACTIVE'
ORDER BY tp.created_at DESC;

-- =====================================================
-- COMENTARIOS PARA FUTURAS MEJORAS
-- =====================================================

-- TODO: Cuando configures Google Calendar Service Account:
--   1. Crear función para sincronizar con gcal_event_id
--   2. Agregar job para expirar HOLDs automáticamente
--   3. Implementar FreeBusy para disponibilidad real

-- TODO: Cuando configures Resend:
--   1. Templates de email (HOLD, confirmación, recordatorios)
--   2. Función para enviar emails desde triggers

-- TODO: Cuando configures Auth (Supabase Auth):
--   1. Refinar políticas RLS por usuario
--   2. Crear tabla admin_users con emails permitidos
--   3. Proteger rutas /admin con middleware

-- =====================================================
-- NOTAS DE MIGRACIÓN
-- =====================================================

-- Este schema es ADITIVO y COMPATIBLE con el actual
-- No elimina tablas ni datos existentes
-- Puedes ejecutarlo de forma segura en tu Supabase actual
