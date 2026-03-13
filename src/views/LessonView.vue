<template>
  <div class="bg-background-dark text-slate-100 min-h-screen">
    <!-- Navbar -->
    <header class="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
      <div class="flex items-center gap-4">
        <router-link to="/dashboard" class="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
          <span class="material-symbols-outlined">arrow_back</span>
          <span class="text-xs font-bold uppercase tracking-widest hidden sm:inline">Back to Dashboard</span>
        </router-link>
        <div class="h-6 w-[1px] bg-slate-800 mx-2 hidden sm:block"></div>
        <div v-if="currentCourse">
          <h1 class="text-sm font-bold text-white leading-none mb-1">{{ currentCourse.title }}</h1>
          <p class="text-[10px] text-primary font-bold uppercase tracking-tighter">{{ currentLesson?.title || 'Course Content' }}</p>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <button class="bg-primary text-background-dark font-bold text-xs px-4 py-2 rounded-lg hover:brightness-110 transition-all flex items-center gap-2">
          Next Lesson <span class="material-symbols-outlined text-sm">navigate_next</span>
        </button>
      </div>
    </header>

    <div class="flex flex-col lg:flex-row h-[calc(100-4rem)]">
      <!-- Player Area -->
      <main class="flex-grow p-6 lg:p-10 space-y-8 overflow-y-auto">
        <GoogleDrivePlayer :videoId="currentLesson?.video_id" />

        <div class="space-y-6 max-w-4xl mx-auto">
          <div class="flex items-center justify-between gap-4">
            <h2 class="text-2xl font-bold">{{ currentLesson?.title || 'Select a lesson' }}</h2>
          </div>
          
          <!-- Tabs -->
          <div class="border-b border-slate-800 flex gap-8">
            <button v-for="tab in ['Overview', 'Resources', 'Notes']" :key="tab" @click="activeTab = tab" :class="['pb-4 text-sm font-bold transition-all border-b-2', activeTab === tab ? 'text-primary border-primary' : 'text-slate-500 border-transparent hover:text-slate-300']">
              {{ tab }}
            </button>
          </div>

          <div class="text-slate-400 text-sm leading-relaxed min-h-[200px]">
            <p v-if="activeTab === 'Overview'">{{ currentLesson?.description || 'No description available for this lesson.' }}</p>
            <p v-else-if="activeTab === 'Resources'">Resources for this lesson will appear here.</p>
            <p v-else>Personal notes can be saved here.</p>
          </div>
        </div>
      </main>

      <!-- Sidebar Curriculum -->
      <aside class="w-full lg:w-96 border-l border-slate-800 bg-navy-accent/20 overflow-y-auto">
        <div class="p-6 border-b border-slate-800">
          <h3 class="font-bold mb-1">Course Curriculum</h3>
          <p class="text-[10px] text-slate-500 uppercase font-black">{{ lessons.length }} Lessons • {{ currentCourse?.duration || '--' }} total</p>
        </div>
        
        <div class="p-2">
          <div v-for="(lesson, index) in lessons" :key="lesson.id" @click="currentLesson = lesson" :class="['flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all mb-1 group', currentLesson?.id === lesson.id ? 'bg-primary/10 border border-primary/20' : 'hover:bg-slate-800 border border-transparent']">
            <div class="size-8 rounded-lg flex items-center justify-center flex-shrink-0" :class="currentLesson?.id === lesson.id ? 'bg-primary text-background-dark' : 'bg-slate-800 text-slate-500 group-hover:text-white'">
              <span class="text-xs font-black">{{ index + 1 }}</span>
            </div>
            <div class="flex-grow">
              <h4 :class="['text-sm font-bold mb-1', currentLesson?.id === lesson.id ? 'text-white' : 'text-slate-300 group-hover:text-white']">
                {{ lesson.title }}
              </h4>
              <div class="flex items-center gap-3 text-[10px] font-medium text-slate-500">
                <span class="flex items-center gap-1"><span class="material-symbols-outlined text-xs">play_circle</span> {{ lesson.duration }}</span>
                <span v-if="lesson.is_free" class="text-primary font-bold">FREE PREVIEW</span>
              </div>
            </div>
            <span v-if="currentLesson?.id === lesson.id" class="material-symbols-outlined text-primary text-lg">equalizer</span>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'
import GoogleDrivePlayer from '../components/GoogleDrivePlayer.vue'

const currentCourse = ref(null)
const currentLesson = ref(null)
const lessons = ref([])
const activeTab = ref('Overview')

onMounted(async () => {
  // Por ahora cargamos el primer curso que encontremos para la demo
  const { data: coursesData } = await supabase.from('courses').select('*').limit(1)
  if (coursesData && coursesData.length > 0) {
    currentCourse.value = coursesData[0]
    
    const { data: lessonsData } = await supabase
      .from('lessons')
      .select('*')
      .eq('course_id', currentCourse.value.id)
      .order('order_index', { ascending: true })
    
    lessons.value = lessonsData || []
    if (lessons.value.length > 0) {
      currentLesson.value = lessons.value[0]
    }
  }
})
</script>
