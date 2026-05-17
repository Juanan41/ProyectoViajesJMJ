BEGIN;

CREATE OR REPLACE FUNCTION fix_mojibake_es(input_text text)
RETURNS text AS $$
DECLARE
  result text := input_text;
BEGIN
  IF result IS NULL THEN
    RETURN NULL;
  END IF;

  result := replace(result, 'Ã¡', 'á');
  result := replace(result, 'Ã©', 'é');
  result := replace(result, 'Ã­', 'í');
  result := replace(result, 'Ã³', 'ó');
  result := replace(result, 'Ãº', 'ú');
  result := replace(result, 'Ã±', 'ñ');
  result := replace(result, 'Ã¼', 'ü');
  result := replace(result, 'Ã¶', 'ö');
  result := replace(result, 'Ã¤', 'ä');
  result := replace(result, 'Ã¥', 'å');
  result := replace(result, 'Ã£', 'ã');
  result := replace(result, 'Ãµ', 'õ');
  result := replace(result, 'Ã§', 'ç');
  result := replace(result, 'Ã½', 'ý');

  result := replace(result, 'Ã', 'Á');
  result := replace(result, 'Ã‰', 'É');
  result := replace(result, 'Ã', 'Í');
  result := replace(result, 'Ã“', 'Ó');
  result := replace(result, 'Ãš', 'Ú');
  result := replace(result, 'Ã‘', 'Ñ');
  result := replace(result, 'Ãœ', 'Ü');
  result := replace(result, 'Ã–', 'Ö');
  result := replace(result, 'Ã„', 'Ä');
  result := replace(result, 'Ã‡', 'Ç');

  result := replace(result, 'Â¿', '¿');
  result := replace(result, 'Â¡', '¡');
  result := replace(result, 'Âº', 'º');
  result := replace(result, 'Âª', 'ª');

  result := replace(result, 'â€™', '’');
  result := replace(result, 'â€˜', '‘');
  result := replace(result, 'â€œ', '“');
  result := replace(result, 'â€', '”');
  result := replace(result, 'â€“', '–');
  result := replace(result, 'â€”', '—');
  result := replace(result, 'â€¦', '…');

  result := replace(result, 'ÄŒ', 'Č');
  result := replace(result, 'Ä', 'č');
  result := replace(result, 'Å¡', 'š');
  result := replace(result, 'Å½', 'Ž');
  result := replace(result, 'Å¾', 'ž');

  RETURN result;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
  item record;
BEGIN
  FOR item IN
    SELECT *
    FROM (VALUES
      ('continente', 'nombre'),
      ('continentes', 'nombre'),

      ('destinos', 'nombre'),
      ('destinos', 'descripcion'),
      ('destinos', 'pais'),

      ('alojamientos', 'nombre'),
      ('alojamientos', 'descripcion'),
      ('alojamientos', 'ciudad'),
      ('alojamientos', 'pais'),
      ('alojamientos', 'tipo'),

      ('habitacion', 'tipo'),
      ('habitacion', 'regimen'),
      ('habitaciones', 'tipo'),
      ('habitaciones', 'regimen'),

      ('opiniones', 'comentario')
    ) AS t(tabla, columna)
  LOOP
    IF to_regclass(item.tabla) IS NOT NULL
       AND EXISTS (
         SELECT 1
         FROM information_schema.columns
         WHERE table_schema = 'public'
           AND table_name = item.tabla
           AND column_name = item.columna
       )
    THEN
      EXECUTE format(
        'UPDATE %I
         SET %I = fix_mojibake_es(%I)
         WHERE %I IS NOT NULL
           AND %I <> fix_mojibake_es(%I)',
        item.tabla,
        item.columna,
        item.columna,
        item.columna,
        item.columna,
        item.columna
      );

      RAISE NOTICE 'Actualizado %.%', item.tabla, item.columna;
    ELSE
      RAISE NOTICE 'Saltado %.% porque no existe', item.tabla, item.columna;
    END IF;
  END LOOP;
END $$;

DROP FUNCTION fix_mojibake_es(text);

COMMIT;