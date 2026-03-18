
<template>
  <div class="flex flex-col h-screen bg-background-dark text-slate-200 font-sans overflow-hidden">
    <!-- Header -->
    <header class="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-navy-dark/50 backdrop-blur-md shrink-0 z-10">
      <div class="flex items-center gap-4">
        <router-link to="/dashboard" class="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
          <span class="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span class="text-xs font-bold uppercase tracking-widest">Back to Dashboard</span>
        </router-link>
        <div class="h-4 w-[1px] bg-slate-800 ml-2"></div>
        <div class="flex flex-col">
          <h1 class="text-sm font-bold text-white truncate max-w-[300px]">{{ currentCourse?.title }}</h1>
          <p class="text-[10px] text-primary font-bold uppercase tracking-tighter">{{ currentLesson?.title }}</p>
        </div>
      </div>
      
      <div class="flex items-center gap-4">
        <button 
          @click="toggleCompletion" 
          :class="['px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all border', 
            isCurrentLessonCompleted ? 'bg-green-500/10 text-green-500 border-green-500/50' : 'bg-primary text-white border-primary shadow-lg shadow-primary/20 hover:scale-105']"
        >
          <span class="material-symbols-outlined text-sm">{{ isCurrentLessonCompleted ? 'check_circle' : 'radio_button_unchecked' }}</span>
          {{ isCurrentLessonCompleted ? 'Hecho' : 'Completar' }}
        </button>
        
        <button 
          @click="goToNextLesson"
          class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold flex items-center gap-2 border border-slate-700 transition-all active:scale-95"
          :disabled="!hasNextLesson"
          :class="{'opacity-50 cursor-not-allowed': !hasNextLesson}"
        >
          Siguiente
          <span class="material-symbols-outlined text-sm">navigate_next</span>
        </button>
      </div>
    </header>

    <div class="flex flex-1 overflow-hidden lg:flex-row flex-col">
      <!-- Main Content / Video Player -->
      <main class="flex-1 overflow-y-auto custom-scrollbar bg-black/20">
        <div class="max-w-5xl mx-auto p-4 lg:p-8">
          <!-- Video Container -->
          <div class="bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800 active-video-shadow mb-8 aspect-video">
             <GoogleDrivePlayer :videoId="currentLesson?.video_id" />
          </div>

          <!-- Tabs -->
          <div class="border-b border-slate-800 flex gap-8 mb-6">
            <button v-for="tab in ['Overview', 'Notes', 'Resources']" :key="tab" @click="activeTab = tab" 
              :class="['pb-4 text-sm font-bold transition-all border-b-2 whitespace-nowrap', 
              activeTab === tab ? 'text-primary border-primary' : 'text-slate-500 border-transparent hover:text-slate-300']">
              {{ tab }}
            </button>
          </div>

          <!-- Tab Content -->
          <div class="text-slate-400 text-sm leading-relaxed min-h-[300px]">
            <div v-if="activeTab === 'Overview'" class="space-y-4">
              <h3 class="text-xl font-bold text-white">{{ currentLesson?.title }}</h3>
              <p>{{ currentLesson?.description || 'No hay descripción disponible para esta lección.' }}</p>
            </div>

            <div v-else-if="activeTab === 'Notes'" class="space-y-4">
              <div class="bg-navy-accent/5 border border-slate-800 rounded-2xl p-6">
                <h4 class="text-white font-bold mb-4 flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary">edit_note</span>
                  Tus apuntes personales
                </h4>
                <textarea 
                  v-model="lessonNote"
                  class="w-full h-64 bg-background-dark/50 border border-slate-700 rounded-xl p-4 text-slate-300 focus:ring-1 focus:ring-primary outline-none transition-all resize-none custom-scrollbar"
                  placeholder="Escribe lo que aprendiste en este video..."
                ></textarea>
                <div class="flex justify-end mt-4">
                  <button 
                    @click="saveNote" 
                    :disabled="isSavingNote"
                    class="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700 transition-all flex items-center gap-2"
                  >
                    <span v-if="isSavingNote" class="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                    <span v-else class="material-symbols-outlined text-sm">save</span>
                    {{ isSavingNote ? 'Guardando...' : 'Guardar Notas' }}
                  </button>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-20 bg-navy-accent/5 rounded-2xl border border-dashed border-slate-800">
               <span class="material-symbols-outlined text-4xl mb-2 opacity-20">folder_open</span>
               <p>No se han adjuntado recursos técnicos para esta clase todavía.</p>
            </div>
          </div>
        </div>
      </main>

      <!-- Sidebar Curriculum -->
      <aside class="w-full lg:w-96 border-l border-slate-800 bg-navy-accent/10 flex flex-col h-full overflow-hidden">
        <div class="p-6 border-b border-slate-800 shrink-0">
          <div class="flex justify-between items-end mb-4">
            <div>
              <h3 class="font-bold text-white">Course Curriculum</h3>
              <p class="text-[10px] text-slate-500 uppercase tracking-widest">{{ totalLessonsCount }} Lessons • 40+ Horas</p>
            </div>
            <div class="text-right">
              <span class="text-2xl font-black text-primary">{{ progressPercentage }}%</span>
            </div>
          </div>
          
          <!-- Progress Bar -->
          <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
            <div class="h-full bg-primary transition-all duration-1000 ease-out" :style="{ width: progressPercentage + '%' }"></div>
          </div>
          <p class="text-[10px] text-slate-400 font-medium">Has completado {{ completedCount }} de {{ totalLessonsCount }} lecciones</p>
        </div>

        <div class="flex-1 overflow-y-auto custom-scrollbar p-2">
          <div v-for="section in sections" :key="section.id" class="mb-4">
            <h4 class="px-4 py-2 text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] bg-slate-800/20 rounded-lg mb-2">
              {{ section.title }}
            </h4>
            
            <div class="space-y-1">
              <button 
                v-for="lesson in section.lessons" 
                :key="lesson.id"
                @click="selectLesson(lesson)"
                :class="['w-full flex items-start gap-3 p-3 rounded-xl transition-all group text-left', 
                  currentLesson?.id === lesson.id ? 'bg-primary/10 border border-primary/20 shadow-lg shadow-primary/5' : 'hover:bg-slate-800/50 border border-transparent']"
              >
                <div :class="['mt-0.5 shrink-0 flex items-center justify-center w-6 h-6 rounded-full border transition-colors', 
                  completedLessons.has(lesson.id) ? 'bg-green-500/20 border-green-500/50 text-green-500' : 
                  (currentLesson?.id === lesson.id ? 'bg-primary border-primary text-white' : 'bg-slate-800 border-slate-700 text-slate-500 group-hover:border-slate-500')]">
                  <span class="material-symbols-outlined text-[14px]">
                    {{ completedLessons.has(lesson.id) ? 'check' : (currentLesson?.id === lesson.id ? 'play_arrow' : 'play_arrow') }}
                  </span>
                </div>
                <div class="flex-1 overflow-hidden">
                  <p :class="['text-xs font-medium leading-snug truncate', currentLesson?.id === lesson.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-200']">
                    {{ lesson.title }}
                  </p>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="material-symbols-outlined text-[10px] text-slate-600">schedule</span>
                    <span class="text-[10px] text-slate-600 font-bold">12:00</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../lib/supabase'
import GoogleDrivePlayer from '../components/GoogleDrivePlayer.vue'

const route = useRoute()

const currentCourse = ref(null)
const currentLesson = ref(null)
const sections = ref([])
const activeTab = ref('Overview')

// Progress and Notes State
const completedLessons = ref(new Set())
const lessonNote = ref('')
const isSavingNote = ref(false)
const user = ref(null)

onMounted(async () => {
  const { data } = await supabase.auth.getUser()
  user.value = data.user
  await fetchCourseData()
  if (user.value) await fetchUserProgress()
})

const fetchUserProgress = async () => {
  const { data, error } = await supabase
    .from('user_progress')
    .select('lesson_id')
    .eq('user_id', user.value.id)
  
  if (data) {
    completedLessons.value = new Set(data.map(p => p.lesson_id))
  }
}

const isCurrentLessonCompleted = computed(() => {
  return currentLesson.value && completedLessons.value.has(currentLesson.value.id)
})

const toggleCompletion = async () => {
  if (!currentLesson.value || !user.value) return
  
  const isCompleted = completedLessons.value.has(currentLesson.value.id)
  
    if (isCompleted) {
    await supabase.from('user_progress')
      .delete()
      .eq('user_id', user.value.id)
      .eq('lesson_id', currentLesson.value.id)
    completedLessons.value.delete(currentLesson.value.id)
  } else {
    await supabase.from('user_progress')
      .insert({ user_id: user.value.id, lesson_id: currentLesson.value.id })
    completedLessons.value.add(currentLesson.value.id)
    
    // Al completar, dar la opción de ir a la siguiente automáticamente tras 1 segundo
    setTimeout(() => {
      if (hasNextLesson.value) goToNextLesson()
    }, 1500)
  }
}

const allLessons = computed(() => sections.value.flatMap(s => s.lessons))
const hasNextLesson = computed(() => {
  const currentIndex = allLessons.value.findIndex(l => l.id === currentLesson.value?.id)
  return currentIndex !== -1 && currentIndex < allLessons.value.length - 1
})

const goToNextLesson = () => {
  const currentIndex = allLessons.value.findIndex(l => l.id === currentLesson.value?.id)
  if (currentIndex !== -1 && currentIndex < allLessons.value.length - 1) {
    selectLesson(allLessons.value[currentIndex + 1])
  }
}

// Cargar nota al cambiar de lección
watch(currentLesson, async (newLesson) => {
  if (!newLesson || !user.value) return
  lessonNote.value = ''
  
  const { data, error } = await supabase
    .from('user_notes')
    .select('content')
    .eq('user_id', user.value.id)
    .eq('lesson_id', newLesson.id)
    .maybeSingle()
  
  if (data) {
    lessonNote.value = data.content
  }
}, { immediate: true })

const saveNote = async () => {
  if (!currentLesson.value || !user.value) return
  isSavingNote.value = true
  
  const { error } = await supabase
    .from('user_notes')
    .upsert({ 
      user_id: user.value.id, 
      lesson_id: currentLesson.value.id, 
      content: lessonNote.value,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id,lesson_id' })
  
  if (error) console.error('Error saving note:', error)
  
  setTimeout(() => { isSavingNote.value = false }, 500)
}

const fetchCourseData = async () => {
  // Aquí usamos el ID del curso pasado por la URL (?courseId=...)
  // Si no se pasa ninguno, por defecto buscamos el de Vue para mantener compatibilidad con lo anterior.
  const courseId = route.query.courseId

  let query = supabase.from('courses').select('*')
  
  if (courseId && courseId !== 'vue-course') {
    // Si tienes UUIDs en Supabase, asegúrate de que esto encaje con tu esquema
    query = query.eq('id', courseId)
  } else {
    // Fallback hacia el curso que ya tenías quemado
    query = query.eq('title', 'VUE de 0 a Experto + Firebase')
  }

  const { data: course } = await query.single()

  if (course) {
    currentCourse.value = course
    
    const { data: sectionsData } = await supabase
      .from('sections')
      .select('*, lessons(*)')
      .eq('course_id', course.id)
      .order('order_index', { ascending: true })

    if (sectionsData) {
      sections.value = sectionsData.map(section => ({
        ...section,
        lessons: section.lessons.sort((a, b) => a.order_index - b.order_index)
      }))

      // Cargar última lección guardada o la primera
      const lastLessonId = localStorage.getItem(`last_lesson_${course.id}`)
      if (lastLessonId) {
        const found = sections.value.flatMap(s => s.lessons).find(l => l.id === lastLessonId)
        currentLesson.value = found || sections.value[0].lessons[0]
      } else if (sections.value[0]?.lessons[0]) {
        currentLesson.value = sections.value[0].lessons[0]
      }
    }
  }
}

const totalLessonsCount = computed(() => {
  return sections.value.reduce((acc, section) => acc + (section.lessons?.length || 0), 0)
})

const completedCount = computed(() => completedLessons.value.size)

const progressPercentage = computed(() => {
  if (totalLessonsCount.value === 0) return 0
  return Math.round((completedCount.value / totalLessonsCount.value) * 100)
})

const selectLesson = (lesson) => {
  currentLesson.value = lesson
  if (currentCourse.value) {
    localStorage.setItem(`last_lesson_${currentCourse.value.id}`, lesson.id)
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #1e293b;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #334155;
}

.active-video-shadow {
  box-shadow: 0 0 50px -12px rgba(56, 189, 248, 0.15);
}
</style>
