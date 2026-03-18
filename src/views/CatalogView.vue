<template>
  <div class="bg-background-dark text-slate-100 min-h-screen">
    <!-- Top Navigation (Reused from Landing) -->
    <header class="sticky top-0 z-50 border-b border-slate-800 bg-background-dark/80 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-8">
            <router-link to="/" class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-3xl">terminal</span>
              <span class="text-xl font-bold tracking-tight text-white">DevQuest</span>
            </router-link>
            <nav class="hidden md:flex items-center gap-6">
              <router-link to="/catalog" class="text-sm font-medium text-primary">Courses</router-link>
              <a class="text-sm font-medium hover:text-primary transition-colors text-white" href="#">Learning Paths</a>
              <a class="text-sm font-medium hover:text-primary transition-colors text-white" href="#">Enterprise</a>
            </nav>
          </div>
          <div class="flex items-center gap-4">
            <router-link to="/dashboard" class="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors">
              <div class="size-6 rounded-full bg-primary flex items-center justify-center text-background-dark font-bold text-xs">O</div>
              <span class="text-sm font-medium text-white">My Dashboard</span>
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex flex-col md:flex-row gap-12">
        <!-- Filters Sidebar -->
        <aside class="w-full md:w-64 space-y-8">
          <div>
            <h3 class="text-sm font-bold uppercase tracking-widest text-primary mb-4">Search</h3>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
              <input type="text" class="w-full bg-navy-accent border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-1 focus:ring-primary focus:border-primary" placeholder="What do you want to learn?" v-model="searchQuery"/>
            </div>
          </div>

          <div>
            <h3 class="text-sm font-bold uppercase tracking-widest text-primary mb-4">Categories</h3>
            <div class="space-y-2">
              <label v-for="cat in categories" :key="cat" class="flex items-center gap-3 group cursor-pointer">
                <input type="checkbox" class="rounded border-slate-700 bg-navy-accent text-primary focus:ring-primary"/>
                <span class="text-sm text-slate-400 group-hover:text-white transition-colors">{{ cat }}</span>
              </label>
            </div>
          </div>

          <div>
            <h3 class="text-sm font-bold uppercase tracking-widest text-primary mb-4">Difficulty</h3>
            <div class="space-y-2">
              <label v-for="level in levels" :key="level" class="flex items-center gap-3 group cursor-pointer">
                <input type="checkbox" class="rounded border-slate-700 bg-navy-accent text-primary focus:ring-primary"/>
                <span class="text-sm text-slate-400 group-hover:text-white transition-colors">{{ level }}</span>
              </label>
            </div>
          </div>
        </aside>

        <!-- Product Grid -->
        <div class="flex-grow">
          <div class="flex flex-col sm:flex-row items-baseline sm:items-center justify-between gap-4 mb-8">
            <h2 class="text-3xl font-bold">Course Catalog</h2>
            <p class="text-slate-400 text-sm">Showing 148 professional courses</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-if="loading" class="col-span-full text-center py-12">
              <span class="material-symbols-outlined text-4xl text-primary animate-spin">progress_activity</span>
              <p class="text-slate-400 mt-4">Cargando catálogo...</p>
            </div>
            
            <div v-else v-for="course in filteredCourses" :key="course.id" class="card-gradient rounded-xl overflow-hidden border border-slate-800 neon-glow transition-all group cursor-pointer" @click="goToLesson(course.id)">
              <div class="aspect-video relative overflow-hidden">
                <img :src="course.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" :alt="course.title"/>
                <div class="absolute top-2 right-2 bg-background-dark/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-primary uppercase">{{ course.level }}</div>
              </div>
              <div class="p-5">
                <p class="text-xs font-bold text-primary mb-2 uppercase tracking-tighter">{{ course.category }}</p>
                <h3 class="text-white font-bold text-lg mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2 h-14">{{ course.title }}</h3>
                <div class="flex items-center gap-4 text-slate-400 text-xs mt-4">
                  <span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">schedule</span> {{ course.duration }}</span>
                  <span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">group</span> {{ course.students }}</span>
                </div>
                <div class="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span class="font-bold text-white text-lg">{{ course.price }}</span>
                  <button class="text-primary font-bold text-sm flex items-center gap-1">
                    Details <span class="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Pagination dummy -->
          <div class="mt-12 flex justify-center gap-2">
            <button class="size-10 rounded-lg border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition-colors">1</button>
            <button class="size-10 rounded-lg bg-primary text-background-dark font-bold flex items-center justify-center">2</button>
            <button class="size-10 rounded-lg border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition-colors">3</button>
            <span class="flex items-end px-2 pb-2">...</span>
            <button class="size-10 rounded-lg border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition-colors">12</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const router = useRouter()
const searchQuery = ref('')

const goToLesson = (id) => {
  // If we had dynamic routes: router.push(`/lesson/${id}`)
  // For now we just push to /lesson, ideally pass it via query or params
  router.push({ path: '/lesson', query: { courseId: id } })
}

const categories = ['Web Development', 'Data Science', 'UI/UX Design', 'DevOps', 'Cybersecurity', 'Mobile Development', 'AI & Machine Learning']
const levels = ['Beginner', 'Intermediate', 'Expert']

const allCourses = ref([])
const loading = ref(true)

onMounted(async () => {
  const { data, error } = await supabase.from('courses').select('*')
  if (data) {
    // Si la DB aún no tiene estos campos, agregamos unos por defecto visuales
    allCourses.value = data.map(course => ({
      ...course,
      image: course.image_url || 'https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg',
      level: course.level || 'Principiante',
      category: course.category || 'Desarrollo',
      duration: course.duration || '15h',
      students: course.students || '+1k',
      price: course.price || 'Gratis'
    }))
  }
  loading.value = false
})

const filteredCourses = computed(() => {
  if (!searchQuery.value) return allCourses.value
  return allCourses.value.filter(c => c.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
})
</script>
