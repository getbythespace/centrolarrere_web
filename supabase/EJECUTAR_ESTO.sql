-- =====================================================
-- INSTRUCCIONES PARA EJECUTAR ESTE SCHEMA
-- =====================================================
-- 1. Abre: https://supabase.com/dashboard/project/kqllwdthqtpjblfmntny/editor
-- 2. Ve a: SQL Editor (icono de base de datos en el menú izquierdo)
-- 3. Copia TODO este archivo
-- 4. Pega en el editor
-- 5. Click en "Run" (botón verde)
-- 6. Espera a que termine (verás "Success" ✅)
-- =====================================================

-- Ejecutar el schema MVP
\i schema-mvp.sql

-- Verificar que todo se creó correctamente
SELECT 
  'patients' as tabla, COUNT(*) as registros FROM patients
UNION ALL
SELECT 
  'treatment_plans', COUNT(*) FROM treatment_plans
UNION ALL
SELECT 
  'plan_adjustments', COUNT(*) FROM plan_adjustments
UNION ALL
SELECT 
  'services', COUNT(*) FROM services
UNION ALL
SELECT 
  'bookings', COUNT(*) FROM bookings;
