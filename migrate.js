
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import https from 'https'

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

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1yq4Jav7nHBVKNF0K63lFJ2MCvdJVXGK2xWaCJ_t1aaM/export?format=csv'

async function downloadCSV(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = ''
      res.on('data', (chunk) => data += chunk)
      res.on('end', () => resolve(data))
      res.on('error', reject)
    })
  })
}

function parseCSV(csv) {
  const lines = csv.split('\n').map(l => l.split(',').map(c => c.replace(/^"|"$/g, '').trim()))
  const headers = lines[0]
  return lines.slice(1).filter(l => l.length >= 4 && l[0]).map(l => ({
    section: l[0],
    title: l[1],
    drive_id: l[2],
    url: l[3]
  }))
}





async function migrate() {
  console.log('🚀 Iniciando migración corregida desde curso_VUE.json...')

  try {
    let rawData = fs.readFileSync('./curso_VUE.json', 'utf8').trim()
    if (!rawData.startsWith('[')) rawData = '[' + rawData + ']'
    const rawLessons = JSON.parse(rawData)

    // 1. Crear el curso
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .insert({
        title: 'VUE de 0 a Experto + Firebase',
        description: 'Curso completo de Vue.js desde fundamentos hasta despliegue con Firebase y Supabse.',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWXTDEOUVj1cbdodTYGydFX8B0yd1VqbSYy_pJh045XsRuhK5h-jndXc8Se8K_aPe9dG3bich66ueRzJHvmqKCI4TTIVObvLxl65jnL3xKNprv02r6VFWY2IgqoFCMmnW8u-L0Me-40uQL3J4wjpQhGpxyQ1S2dxtO2dYlGY-a09EIHBWs3bdQtsoNufP0Ma-qQ_9OTOtKXZZbjFfIOoxsHM7UUY7ziC9EctkacT0725zNmVhNrRv2ztIWlyWrFHNPl7pLd_e1DkM',
        duration: '40+ horas',
        level: 'Expert'
      })
      .select().single()

    if (courseError) throw courseError
    console.log(`✅ Curso creado ID: ${course.id}`)

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
    // 3. Procesar cada sección en el orden en que aparecen en el JSON
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
      console.log(`   ✅ ${sortedLessons.length} lecciones insertadas en orden.`)
    }

    console.log('✨ Migración completada con el orden correcto.')
  } catch (err) {
    console.error('💥 Error crítico:', err.message)
  }
}




migrate()
