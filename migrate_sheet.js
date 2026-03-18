import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

// Cargar variables de entorno manualmente desde .env
const env = fs.readFileSync('.env', 'utf8')
const getEnv = (key) => env.split('\n').find(l => l.startsWith(key))?.split('=')[1]?.trim()

const supabaseUrl = getEnv('VITE_SUPABASE_URL')
const supabaseKey = getEnv('VITE_SUPABASE_ANON_KEY')

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: No se encontraron las credenciales en el archivo .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/188x-tTmdukL4s3ZVKNTa7EZ7jD6CUn55kXPl6eKm2So/export?format=csv'

async function fetchCSV(url) {
  const response = await fetch(url)
  return await response.text()
}

function parseCSV(csv) {
  const lines = []
  let currentRow = []
  let currentField = ''
  let inQuotes = false

  // Simple CSV parser that handles quotes and commas inside them
  for (let i = 0; i < csv.length; i++) {
    const char = csv[i]
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentField.trim())
      currentField = ''
    } else if (char === '\n' && !inQuotes) {
      currentRow.push(currentField.trim())
      lines.push(currentRow)
      currentRow = []
      currentField = ''
    } else if (char !== '\r') {
      currentField += char
    }
  }
  if (currentField !== '' || currentRow.length > 0) {
    currentRow.push(currentField.trim())
    lines.push(currentRow)
  }

  // Remove headers
  const data = lines.slice(1).filter(l => l.length >= 4 && l[0])
  return data.map(l => ({
    Carpeta: l[0],
    Video: l[1],
    ID: l[2],
    Link: l[3]
  }))
}

async function migrate() {
  console.log(`🚀 Descargando CSV desde ${SHEET_URL}...`)

  try {
    const csvData = await fetchCSV(SHEET_URL)
    const rawLessons = parseCSV(csvData)

    console.log(`✅ CSV parseado. Encontradas ${rawLessons.length} lecciones.`)

    // 1. Crear el curso (puedes cambiar estos valores en Supabase luego)
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .insert({
        title: 'Master en JavaScript, Vue 3, React', // Título genérico por ahora
        description: 'Curso completo importado desde Google Sheets.',
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/600px-JavaScript-logo.png',
        duration: '25+ horas',
        level: 'Principiantes'
      })
      .select().single()

    if (courseError) throw courseError
    console.log(`✅ Nuevo curso creado en base de datos con ID: ${course.id}`)

    // 2. Agrupar lecciones por sección para poder ordenarlas
    const sectionsMap = new Map()
    for (const item of rawLessons) {
      const sectionName = item.Carpeta || 'Sin Sección'
      if (!sectionsMap.has(sectionName)) {
        sectionsMap.set(sectionName, [])
      }
      sectionsMap.get(sectionName).push(item)
    }

    let sectionOrder = 1
    // 3. Procesar cada sección en el orden en que aparecen en el CSV
    for (const [sectionName, lessonsList] of sectionsMap) {
      console.log(`📁 Procesando sección: ${sectionName}`)
      
      const { data: section, error: secError } = await supabase
        .from('sections')
        .insert({
          course_id: course.id,
          title: sectionName,
          order_index: sectionOrder++
        })
        .select().single()
      
      if (secError) throw secError

      // 4. ORDENAR lecciones de esta sección por el número al inicio del título (001, 002...)
      const sortedLessons = lessonsList.sort((a, b) => {
        const numA = parseInt(a.Video?.match(/^\d+/) || 0)
        const numB = parseInt(b.Video?.match(/^\d+/) || 0)
        return numA - numB
      })

      let lessonOrder = 1
      for (const item of sortedLessons) {
        const { error: lessonError } = await supabase
          .from('lessons')
          .insert({
            course_id: course.id,
            section_id: section.id,
            title: item.Video || 'Sin Título',
            video_id: item.ID || '',
            video_url: item.Link || '',
            order_index: lessonOrder++
          })

        if (lessonError) console.error(`❌ Error en ${item.Video}:`, lessonError.message)
      }
      console.log(`   ✅ ${sortedLessons.length} lecciones insertadas en la sección '${sectionName}'.`)
    }

    console.log('✨ ¡NUEVO CURSO AGREGADO CON ÉXITO!')
  } catch (err) {
    console.error('💥 Error crítico:', err.message)
  }
}

migrate()
