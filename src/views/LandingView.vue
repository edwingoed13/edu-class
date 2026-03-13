<template>
  <div class="bg-background-dark text-slate-100 antialiased min-h-screen">
    <!-- Top Navigation -->
    <header class="sticky top-0 z-50 border-b border-slate-800 bg-background-dark/80 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-8">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-3xl">terminal</span>
              <span class="text-xl font-bold tracking-tight text-white">DevQuest</span>
            </div>
            <nav class="hidden md:flex items-center gap-6">
              <router-link to="/catalog" class="text-sm font-medium hover:text-primary transition-colors text-white">Courses</router-link>
              <a class="text-sm font-medium hover:text-primary transition-colors text-white" href="#">Learning Paths</a>
              <a class="text-sm font-medium hover:text-primary transition-colors text-white" href="#">Enterprise</a>
              <a class="text-sm font-medium hover:text-primary transition-colors text-white" href="#">Community</a>
            </nav>
          </div>
          <div class="flex items-center gap-4">
            <div class="hidden lg:flex relative">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
              <input class="bg-navy-accent border-none rounded-lg pl-10 pr-4 py-1.5 text-sm focus:ring-1 focus:ring-primary w-64 text-white placeholder-slate-400" placeholder="Search courses..." type="text"/>
            </div>
            <router-link to="/auth" class="text-sm font-semibold px-4 py-2 hover:text-primary transition-colors text-white">Log In</router-link>
            <router-link to="/auth" class="bg-primary text-background-dark font-bold text-sm px-5 py-2 rounded-lg hover:brightness-110 transition-all inline-block">Sign Up</router-link>
          </div>
        </div>
      </div>
    </header>

    <main>
      <!-- Hero Section -->
      <section class="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div class="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1 mb-6">
                <span class="material-symbols-outlined text-primary text-sm">rocket_launch</span>
                <span class="text-primary text-xs font-bold uppercase tracking-wider">New: AI Engineering Path</span>
              </div>
              <h1 class="text-4xl md:text-6xl font-extrabold leading-tight text-white mb-6">
                Master the skills that <span class="text-primary">define the future</span>
              </h1>
              <p class="text-lg text-slate-300 mb-8 max-w-xl">
                Join 2M+ students learning code, design, and business from top industry experts. Hands-on projects, real certifications, and a community that never stops growing.
              </p>
              <div class="flex flex-wrap gap-4">
                <button class="bg-primary text-background-dark font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform">Start Learning Now</button>
                <button class="bg-navy-accent border border-slate-700 text-white font-bold px-8 py-4 rounded-xl hover:bg-slate-800 transition-colors">Explore Paths</button>
              </div>
            </div>
            <div class="relative">
              <div class="w-full aspect-video rounded-2xl overflow-hidden border border-slate-700 shadow-2xl relative group">
                <div class="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors z-10"></div>
                <img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKQFmcCmybRY2fq1cGQRRkqneh8uOT9R3ERSjARftrxB5tqqjm5NMW_NTZ0ArXIw0lzQiiwz6Ln2oycgjIMdSGE_nRo_3B-dA7J1Jy3_lFnkei0PFnOz_7U6RSNsHCS72OkkP1Z9Za1mVcBv7Dmh14YoAHRPcVzCW61DGJt15l_HDmrich27gr-dG12BJAT__qwcrSAQmRx1Zr7pvV6YyEysu9OjgCHRIcaOB6XIIvrc7Ufu9csyauevIdCswV0A_Ce8K341GtF9g" alt="Hero Image"/>
                <div class="absolute inset-0 flex items-center justify-center z-20">
                  <button class="size-20 bg-primary rounded-full flex items-center justify-center text-background-dark hover:scale-110 transition-transform shadow-lg">
                    <span class="material-symbols-outlined text-4xl fill-1">play_arrow</span>
                  </button>
                </div>
              </div>
              <div class="absolute -bottom-6 -left-6 bg-navy-accent p-4 rounded-xl border border-slate-700 shadow-xl hidden md:block">
                <div class="flex items-center gap-3">
                  <div class="flex -space-x-2">
                    <div class="size-8 rounded-full border-2 border-navy-accent bg-slate-500"></div>
                    <div class="size-8 rounded-full border-2 border-navy-accent bg-slate-400"></div>
                    <div class="size-8 rounded-full border-2 border-navy-accent bg-slate-300"></div>
                  </div>
                  <span class="text-xs font-medium text-slate-200">50k+ students online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"></div>
        <div class="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]"></div>
      </section>

      <!-- Featured Courses -->
      <section class="py-20 bg-background-dark">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-end mb-12">
            <div>
              <h2 class="text-3xl font-bold text-white mb-2">Popular Courses</h2>
              <p class="text-slate-400">Hand-picked by our curators for the highest impact.</p>
            </div>
            <router-link to="/catalog" class="text-primary font-semibold flex items-center gap-2 hover:underline">
              View all 800+ courses <span class="material-symbols-outlined">arrow_forward</span>
            </router-link>
          </div>
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="course in courses" :key="course.id" class="card-gradient rounded-xl overflow-hidden border border-slate-800 neon-glow transition-all group cursor-pointer" @click="goToCourse">
              <div class="aspect-video relative overflow-hidden">
                <img :src="course.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" :alt="course.title"/>
                <div class="absolute top-2 right-2 bg-background-dark/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-primary uppercase">{{ course.level }}</div>
              </div>
              <div class="p-5">
                <p class="text-xs font-bold text-primary mb-2 uppercase tracking-tighter">{{ course.category }}</p>
                <h3 class="text-white font-bold text-lg mb-2 leading-snug">{{ course.title }}</h3>
                <div class="flex items-center gap-2 text-slate-400 text-xs">
                  <span class="material-symbols-outlined text-sm">schedule</span>
                  {{ course.duration }}
                  <span class="mx-1">•</span>
                  <span class="material-symbols-outlined text-sm">group</span>
                  {{ course.students }} students
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Pricing Section -->
      <section class="py-24 relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-white mb-4">Choose your learning speed</h2>
            <p class="text-slate-400">Unlock your full potential with an expert-led plan.</p>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div v-for="plan in plans" :key="plan.name" :class="['p-8 rounded-2xl border flex flex-col h-full', plan.featured ? 'bg-navy-accent border-2 border-primary shadow-[0_0_40px_rgba(151,202,63,0.15)] scale-105 relative' : 'bg-navy-accent/30 border-slate-800']">
              <div v-if="plan.featured" class="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-background-dark text-[10px] font-black uppercase tracking-widest">Most Popular</div>
              <div class="mb-8">
                <h3 class="text-white font-bold text-xl mb-2">{{ plan.name }}</h3>
                <p class="text-slate-400 text-sm">{{ plan.tagline }}</p>
              </div>
              <div class="mb-8">
                <span class="text-4xl font-bold text-white">{{ plan.price }}</span>
                <span class="text-slate-400">{{ plan.period }}</span>
              </div>
              <ul class="space-y-4 mb-10 flex-grow">
                <li v-for="feature in plan.features" :key="feature.text" class="flex items-center gap-3 text-sm" :class="feature.included ? 'text-slate-300' : 'text-slate-500 line-through'">
                  <span v-if="feature.included" class="material-symbols-outlined text-primary text-lg">check</span>
                  {{ feature.text }}
                </li>
              </ul>
              <button :class="['w-full py-4 rounded-xl font-bold transition-all', plan.featured ? 'bg-primary text-background-dark font-black hover:brightness-110 shadow-lg shadow-primary/20' : 'border border-slate-700 text-white hover:bg-slate-800']">
                {{ plan.buttonText }}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="bg-background-dark border-t border-slate-800 pt-16 pb-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-16">
          <div class="col-span-2">
            <div class="flex items-center gap-2 mb-6">
              <span class="material-symbols-outlined text-primary text-3xl">terminal</span>
              <span class="text-xl font-bold tracking-tight text-white">DevQuest</span>
            </div>
            <p class="text-slate-400 text-sm leading-relaxed mb-6">Empowering the next generation of digital builders through high-quality, accessible education in engineering, design, and business.</p>
          </div>
        </div>
        <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-slate-500 text-xs text-white">© 2024 DevQuest EdTech Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToCourse = () => {
  router.push('/lesson')
}

const courses = [
  {
    id: 1,
    title: 'Professional React 18 & Next.js',
    category: 'Web Development',
    level: 'Expert',
    duration: '24 hours',
    students: '12.5k',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWXTDEOUVj1cbdodTYGydFX8B0yd1VqbSYy_pJh045XsRuhK5h-jndXc8Se8K_aPe9dG3bich66ueRzJHvmqKCI4TTIVObvLxl65jnL3xKNprv02r6VFWY2IgqoFCMmnW8u-L0Me-40uQL3J4wjpQhGpxyQ1S2dxtO2dYlGY-a09EIHBWs3bdQtsoNufP0Ma-qQ_9OTOtKXZZbjFfIOoxsHM7UUY7ziC9EctkacT0725zNmVhNrRv2ztIWlyWrFHNPl7pLd_e1DkM'
  },
  {
    id: 2,
    title: 'Python for Data Engineering',
    category: 'Data Science',
    level: 'Beginner',
    duration: '32 hours',
    students: '8.2k',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyC8YaLsA7AM9IPhH1QP6IKATBkesHoQtrMRGnrns1KTT5KeqLR_cYd_s37r60RF9VrYjZf_jWn52TKg1P3gp_qP5RM6DN9uXVfqtyIKANOEua2gDhi6UvuQcllKv9kfr166ZDGfMJpqakAB3vuBTZxc3gRsvNSMfh9kM5VKiGvuSny2VwtMh_KKIcQHLxtiBntA8AYc8UWrNYdVbEnwbW_fU0F0wj2InTxHBWNel_7U2KdEOqWwfTLo7KjkvYswH9WwtpRPxxYRc'
  },
  {
    id: 3,
    title: 'Advanced UI/UX Systems',
    category: 'Design',
    level: 'Intermediate',
    duration: '18 hours',
    students: '4.1k',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxd-PmBvsps9mvqB4JmUfJ6K894J_9Aaj14Qt64HBv_U_mAa2qLf6yaJasw8v4vroh8hkjifG-A1TGiLBP3bs3jsrXZMwYhQjd4X2x3buJ6w4vwr25RY3no7ENmHr7rf0SiOF4gdaZ7-4h-cUTqobMk1CYL1Vi021gozu6xRqVwch4G-4ml0d2UyNDmYeS67M6fUDBMUKRstoz5UBaNsLlR8wxC4CBFEkct2a7x6QBzGlwTJkIPHg5PSCjqb-FnHJXmQ--BfLhtsU'
  },
  {
    id: 4,
    title: 'Kubernetes in Production',
    category: 'DevOps',
    level: 'Expert',
    duration: '40 hours',
    students: '2.9k',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-wJDNHhqzLrX86_A3adSHNm1DLBvaz5Dsit5Cvk_99W3mzyhN9dlOuRSRHoxHg87EWieyIYcnxlDmpgh6E9Ajdo9KGSYNm-x9oK6XeUwMh7srN6NQhubtMavHdiCQW1OhjZd8iStOGwQ1KN3IezgB5qmji7BFqJCdbq-E9LFOhRGYeVOQJAkMLnH1jEYgQdU9aBJoLwnNzMXhDa-mRJAY0n0UdUxs4bwWo3zSmwdl0cKMSqoacQmF9ALSBI0yvp0-9N2Xa4ujZog'
  }
]

const plans = [
  {
    name: 'Free',
    tagline: 'Kickstart your journey',
    price: '$0',
    period: '/mo',
    features: [
      { text: '5 introductory courses', included: true },
      { text: 'Community access', included: true },
      { text: 'Certifications', included: false }
    ],
    buttonText: 'Start for free',
    featured: false
  },
  {
    name: 'Expert Plus',
    tagline: 'Everything you need to get hired',
    price: '$19',
    period: '/mo',
    features: [
      { text: '800+ Professional Courses', included: true },
      { text: 'Official Certifications', included: true },
      { text: 'Learning Paths', included: true },
      { text: 'Offline viewing (Mobile)', included: true }
    ],
    buttonText: 'Go Expert Plus',
    featured: true
  },
  {
    name: 'Team',
    tagline: 'Scale your engineering team',
    price: '$49',
    period: '/mo per user',
    features: [
      { text: 'Team Analytics Dashboard', included: true },
      { text: 'Custom Learning Paths', included: true },
      { text: 'Priority Support', included: true }
    ],
    buttonText: 'Contact Sales',
    featured: false
  }
]
</script>
