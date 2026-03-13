<template>
  <div class="bg-background-dark text-slate-100 flex min-h-screen">
    <!-- Sidebar -->
    <aside class="w-64 border-r border-slate-800 flex flex-col hidden md:flex">
      <div class="p-6 flex items-center gap-2">
        <span class="material-symbols-outlined text-primary text-3xl">terminal</span>
        <span class="text-xl font-bold tracking-tight text-white">DevQuest</span>
      </div>
      
      <nav class="flex-grow p-4 space-y-2">
        <router-link to="/dashboard" class="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary border border-primary/20">
          <span class="material-symbols-outlined">dashboard</span>
          <span class="font-medium">Dashboard</span>
        </router-link>
        <router-link to="/catalog" class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
          <span class="material-symbols-outlined">menu_book</span>
          <span class="font-medium">My Courses</span>
        </router-link>
        <router-link to="/settings" class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
          <span class="material-symbols-outlined">settings</span>
          <span class="font-medium">Settings</span>
        </router-link>
      </nav>
      
      <div class="p-4 border-t border-slate-800 space-y-4">
        <div class="bg-navy-accent rounded-xl p-4 border border-slate-700">
          <p class="text-xs font-bold text-primary mb-2 uppercase tracking-widest">Expert Plus</p>
          <p class="text-sm font-medium mb-3">24 days remaining</p>
          <div class="h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div class="h-full bg-primary w-2/3"></div>
          </div>
        </div>
        
        <button @click="handleLogout" class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors group">
          <span class="material-symbols-outlined group-hover:-translate-x-1 transition-transform">logout</span>
          <span class="font-bold text-sm">Sign Out</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-grow flex flex-col h-screen overflow-y-auto">
      <header class="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-background-dark sticky top-0 z-20 w-full">
        <div class="flex items-center gap-4">
          <h1 class="text-xl font-bold">Student Dashboard</h1>
        </div>
        <div class="flex items-center gap-6">
          <button class="text-slate-400 hover:text-white transition-colors relative">
            <span class="material-symbols-outlined">notifications</span>
            <span class="absolute top-0 right-0 size-2 bg-primary rounded-full border border-background-dark"></span>
          </button>
          
          <div class="relative group">
            <button class="flex items-center gap-3 pl-6 border-l border-slate-800 hover:opacity-80 transition-opacity">
              <div class="text-right hidden sm:block">
                <p class="text-sm font-bold text-white">{{ profile?.full_name || 'Student' }}</p>
                <p class="text-[10px] text-primary font-bold uppercase tracking-tighter">Pro Learner</p>
              </div>
              <div class="size-10 rounded-full overflow-hidden bg-primary flex items-center justify-center text-background-dark font-bold text-lg border border-primary/20 shadow-lg shadow-primary/10">
                <img v-if="profile?.avatar_url" :src="profile.avatar_url" class="w-full h-full object-cover" />
                <span v-else>{{ profile?.full_name?.charAt(0) || 'S' }}</span>
              </div>
            </button>
            
            <!-- Dropdown Menu -->
            <div class="absolute right-0 mt-2 w-48 bg-navy-accent border border-slate-700 rounded-2xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
              <router-link to="/settings" class="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                <span class="material-symbols-outlined text-lg">person</span> Profile Settings
              </router-link>
              <div class="h-[1px] bg-slate-700 my-2 mx-4"></div>
              <button @click="handleLogout" class="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                <span class="material-symbols-outlined text-lg">logout</span> Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div class="p-8 space-y-8">
        <!-- Welcome Hero -->
        <section class="bg-gradient-to-r from-navy-accent to-background-dark rounded-3xl p-8 border border-slate-800 relative overflow-hidden">
          <div class="relative z-10 max-w-2xl">
            <h2 class="text-3xl font-bold mb-4">Welcome back, {{ profile?.full_name?.split(' ')[0] || 'Student' }}! 👋</h2>
            <p class="text-slate-400 mb-6">You've completed 75% of your weekly goal. Keep going to maintain your streak of 12 days!</p>
            <div class="flex gap-4">
              <router-link to="/lesson" class="bg-primary text-background-dark font-bold px-6 py-2.5 rounded-xl hover:brightness-110 transition-all flex items-center gap-2">
                Continue: React Design Systems
                <span class="material-symbols-outlined text-lg">play_arrow</span>
              </router-link>
            </div>
          </div>
          <div class="absolute right-12 bottom-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        </section>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="stat in stats" :key="stat.label" class="bg-navy-accent/40 p-6 rounded-2xl border border-slate-800">
            <div class="flex items-center justify-between mb-4">
              <div class="size-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <span class="material-symbols-outlined text-primary">{{ stat.icon }}</span>
              </div>
              <span class="text-xs font-bold text-green-400">{{ stat.trend }}</span>
            </div>
            <p class="text-3xl font-bold mb-1">{{ stat.value }}</p>
            <p class="text-sm text-slate-500">{{ stat.label }}</p>
          </div>
        </div>

        <!-- content columns -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Continue Learning -->
          <div class="lg:col-span-2 space-y-6">
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-bold">In Progress</h3>
              <a href="#" class="text-primary text-sm font-bold hover:underline">View all</a>
            </div>
            
            <div class="space-y-4">
              <div v-for="course in activeCourses" :key="course.title" class="bg-navy-accent/40 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row gap-6 hover:border-slate-600 transition-colors group cursor-pointer" @click="goToLesson">
                <div class="w-full sm:w-48 aspect-video rounded-xl overflow-hidden relative">
                  <img :src="course.image" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" :alt="course.title"/>
                  <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span class="material-symbols-outlined text-white text-4xl">play_circle</span>
                  </div>
                </div>
                <div class="flex-grow py-1">
                  <div class="flex items-center justify-between mb-2">
                    <p class="text-xs font-bold text-primary uppercase tracking-tighter">{{ course.category }}</p>
                    <p class="text-xs text-slate-400">{{ course.progress }}% completed</p>
                  </div>
                  <h4 class="text-lg font-bold mb-4">{{ course.title }}</h4>
                  <div class="h-1.5 bg-slate-800 rounded-full overflow-hidden mb-4">
                    <div class="h-full bg-primary" :style="{ width: course.progress + '%' }"></div>
                  </div>
                  <div class="flex items-center gap-4 text-xs text-slate-400">
                    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">menu_book</span> {{ course.lessons }} Lessons</span>
                    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">schedule</span> {{ course.timeRem }} remaining</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Skill Radar / Paths -->
          <div class="space-y-6">
            <h3 class="text-xl font-bold">Recommended Paths</h3>
            <div class="space-y-4">
              <div v-for="path in recommendedPaths" :key="path.title" class="bg-navy-accent/80 p-6 rounded-2xl border border-slate-700 hover:border-primary/50 transition-all cursor-pointer">
                <div class="size-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <span class="material-symbols-outlined text-primary text-2xl">{{ path.icon }}</span>
                </div>
                <h4 class="font-bold text-lg mb-2">{{ path.title }}</h4>
                <p class="text-sm text-slate-400 mb-4">{{ path.desc }}</p>
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-300">{{ path.courses }} Courses</span>
                  <span class="material-symbols-outlined text-primary">arrow_forward</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const router = useRouter()
const profile = ref(null)

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    router.push('/auth')
    return
  }

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
  
  if (data) profile.value = data
})

const goToLesson = () => {
  router.push('/lesson')
}

const handleLogout = async () => {
  await supabase.auth.signOut()
  router.push('/auth')
}

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', active: true },
  { label: 'My Courses', icon: 'menu_book', active: false },
  { label: 'Learning Paths', icon: 'route', active: false },
  { label: 'Certifications', icon: 'verified', active: false },
  { label: 'Messages', icon: 'mail', active: false },
  { label: 'Settings', icon: 'settings', active: false }
]

const stats = [
  { label: 'Courses in Progress', value: '4', icon: 'play_circle', trend: '+1 this week' },
  { label: 'Completed Lessons', value: '128', icon: 'task_alt', trend: '+24%' },
  { label: 'Learning Points', value: '3,450', icon: 'bolt', trend: '+450 today' },
  { label: 'Streak Days', value: '12', icon: 'local_fire_department', trend: 'Record!' }
]

const activeCourses = [
  {
    title: 'Advanced UI/UX Systems',
    category: 'Design',
    progress: 75,
    lessons: 18,
    timeRem: '2h 15m',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxd-PmBvsps9mvqB4JmUfJ6K894J_9Aaj14Qt64HBv_U_mAa2qLf6yaJasw8v4vroh8hkjifG-A1TGiLBP3bs3jsrXZMwYhQjd4X2x3buJ6w4vwr25RY3no7ENmHr7rf0SiOF4gdaZ7-4h-cUTqobMk1CYL1Vi021gozu6xRqVwch4G-4ml0d2UyNDmYeS67M6fUDBMUKRstoz5UBaNsLlR8wxC4CBFEkct2a7x6QBzGlwTJkIPHg5PSCjqb-FnHJXmQ--BfLhtsU'
  },
  {
    title: 'Professional React 18 & Next.js',
    category: 'Web Development',
    progress: 30,
    lessons: 42,
    timeRem: '12h 40m',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWXTDEOUVj1cbdodTYGydFX8B0yd1VqbSYy_pJh045XsRuhK5h-jndXc8Se8K_aPe9dG3bich66ueRzJHvmqKCI4TTIVObvLxl65jnL3xKNprv02r6VFWY2IgqoFCMmnW8u-L0Me-40uQL3J4wjpQhGpxyQ1S2dxtO2dYlGY-a09EIHBWs3bdQtsoNufP0Ma-qQ_9OTOtKXZZbjFfIOoxsHM7UUY7ziC9EctkacT0725zNmVhNrRv2ztIWlyWrFHNPl7pLd_e1DkM'
  }
]

const recommendedPaths = [
  { title: 'AI Developer', icon: 'psychology', desc: 'Master LLMs and GenAI applications.', courses: 15 },
  { title: 'Frontend Mastery', icon: 'code', desc: 'From HTML to Advanced Frameworks.', courses: 12 }
]
</script>
