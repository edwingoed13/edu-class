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
            <div v-for="course in filteredCourses" :key="course.id" class="card-gradient rounded-xl overflow-hidden border border-slate-800 neon-glow transition-all group cursor-pointer" @click="goToLesson">
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

const goToLesson = () => {
  router.push('/lesson')
}

const categories = ['Web Development', 'Data Science', 'UI/UX Design', 'DevOps', 'Cybersecurity', 'Mobile Development', 'AI & Machine Learning']
const levels = ['Beginner', 'Intermediate', 'Expert']

const allCourses = [
  {
    id: 1,
    title: 'Professional React 18 & Next.js',
    category: 'Web Development',
    level: 'Expert',
    duration: '24h',
    students: '12.5k',
    price: '$24.99',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWXTDEOUVj1cbdodTYGydFX8B0yd1VqbSYy_pJh045XsRuhK5h-jndXc8Se8K_aPe9dG3bich66ueRzJHvmqKCI4TTIVObvLxl65jnL3xKNprv02r6VFWY2IgqoFCMmnW8u-L0Me-40uQL3J4wjpQhGpxyQ1S2dxtO2dYlGY-a09EIHBWs3bdQtsoNufP0Ma-qQ_9OTOtKXZZbjFfIOoxsHM7UUY7ziC9EctkacT0725zNmVhNrRv2ztIWlyWrFHNPl7pLd_e1DkM'
  },
  {
    id: 2,
    title: 'Python for Data Engineering',
    category: 'Data Science',
    level: 'Beginner',
    duration: '32h',
    students: '8.2k',
    price: 'Free',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyC8YaLsA7AM9IPhH1QP6IKATBkesHoQtrMRGnrns1KTT5KeqLR_cYd_s37r60RF9VrYjZf_jWn52TKg1P3gp_qP5RM6DN9uXVfqtyIKANOEua2gDhi6UvuQcllKv9kfr166ZDGfMJpqakAB3vuBTZxc3gRsvNSMfh9kM5VKiGvuSny2VwtMh_KKIcQHLxtiBntA8AYc8UWrNYdVbEnwbW_fU0F0wj2InTxHBWNel_7U2KdEOqWwfTLo7KjkvYswH9WwtpRPxxYRc'
  },
  {
    id: 3,
    title: 'Advanced UI/UX Systems',
    category: 'Design',
    level: 'Intermediate',
    duration: '18h',
    students: '4.1k',
    price: '$19.99',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxd-PmBvsps9mvqB4JmUfJ6K894J_9Aaj14Qt64HBv_U_mAa2qLf6yaJasw8v4vroh8hkjifG-A1TGiLBP3bs3jsrXZMwYhQjd4X2x3buJ6w4vwr25RY3no7ENmHr7rf0SiOF4gdaZ7-4h-cUTqobMk1CYL1Vi021gozu6xRqVwch4G-4ml0d2UyNDmYeS67M6fUDBMUKRstoz5UBaNsLlR8wxC4CBFEkct2a7x6QBzGlwTJkIPHg5PSCjqb-FnHJXmQ--BfLhtsU'
  },
  {
    id: 4,
    title: 'Kubernetes in Production',
    category: 'DevOps',
    level: 'Expert',
    duration: '40h',
    students: '2.9k',
    price: '$34.99',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-wJDNHhqzLrX86_A3adSHNm1DLBvaz5Dsit5Cvk_99W3mzyhN9dlOuRSRHoxHg87EWieyIYcnxlDmpgh6E9Ajdo9KGSYNm-x9oK6XeUwMh7srN6NQhubtMavHdiCQW1OhjZd8iStOGwQ1KN3IezgB5qmji7BFqJCdbq-E9LFOhRGYeVOQJAkMLnH1jEYgQdU9aBJoLwnNzMXhDa-mRJAY0n0UdUxs4bwWo3zSmwdl0cKMSqoacQmF9ALSBI0yvp0-9N2Xa4ujZog'
  }
]

const filteredCourses = computed(() => {
  if (!searchQuery.value) return allCourses
  return allCourses.filter(c => c.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
})
</script>
