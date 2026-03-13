<template>
  <div class="bg-background-dark text-slate-100 flex min-h-screen">
    <!-- Sidebar -->
    <aside class="w-64 border-r border-slate-800 flex flex-col hidden md:flex">
      <div class="p-6 flex items-center gap-2">
        <router-link to="/" class="flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-3xl">terminal</span>
          <span class="text-xl font-bold tracking-tight text-white">DevQuest</span>
        </router-link>
      </div>
      
      <nav class="flex-grow p-4 space-y-2">
        <router-link to="/dashboard" class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
          <span class="material-symbols-outlined">dashboard</span>
          <span class="font-medium">Dashboard</span>
        </router-link>
        <router-link to="/catalog" class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
          <span class="material-symbols-outlined">menu_book</span>
          <span class="font-medium">My Courses</span>
        </router-link>
        <router-link to="/settings" class="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary border border-primary/20 transition-colors">
          <span class="material-symbols-outlined">settings</span>
          <span class="font-medium">Settings</span>
        </router-link>
      </nav>

      <div class="p-4 border-t border-slate-800">
        <button @click="handleLogout" class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
          <span class="material-symbols-outlined">logout</span>
          <span class="font-medium">Log Out</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-grow flex flex-col h-screen overflow-y-auto">
      <header class="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-background-dark sticky top-0 z-20 w-full">
        <h1 class="text-xl font-bold">Profile Settings</h1>
        <div class="flex items-center gap-6">
          <button class="text-slate-400 hover:text-white transition-colors relative">
            <span class="material-symbols-outlined">notifications</span>
            <span class="absolute top-0 right-0 size-2 bg-primary rounded-full border border-background-dark"></span>
          </button>
          
          <div class="relative group">
            <button class="flex items-center gap-3 pl-6 border-l border-slate-800 hover:opacity-80 transition-opacity">
              <div class="text-right">
                <p class="text-sm font-bold text-white">{{ fullName || 'User' }}</p>
                <p class="text-[10px] text-primary font-bold uppercase tracking-tighter">Edit Account</p>
              </div>
              <div class="size-10 rounded-full overflow-hidden border-2 border-primary/20 bg-primary/10 flex items-center justify-center shadow-lg shadow-primary/10">
                <img v-if="avatarUrl" :src="avatarUrl" class="w-full h-full object-cover" />
                <span v-else class="material-symbols-outlined text-primary text-xl">person</span>
              </div>
            </button>

            <!-- Dropdown Menu -->
            <div class="absolute right-0 mt-2 w-48 bg-navy-accent border border-slate-700 rounded-2xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
              <router-link to="/dashboard" class="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                <span class="material-symbols-outlined text-lg">dashboard</span> Dashboard
              </router-link>
              <div class="h-[1px] bg-slate-700 my-2 mx-4"></div>
              <button @click="handleLogout" class="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                <span class="material-symbols-outlined text-lg">logout</span> Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div class="p-8 max-w-4xl mx-auto w-full">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Avatar Card -->
          <div class="lg:col-span-1">
            <div class="bg-navy-accent/40 rounded-3xl border border-slate-800 p-8 text-center sticky top-24">
              <div class="relative inline-block mb-6">
                <div class="size-32 rounded-full overflow-hidden border-4 border-slate-800 bg-background-dark shadow-2xl mx-auto flex items-center justify-center">
                  <img v-if="avatarUrl" :src="avatarUrl" class="w-full h-full object-cover" />
                  <span v-else class="material-symbols-outlined text-slate-700 text-5xl">person</span>
                </div>
                <label class="absolute bottom-0 right-0 size-10 bg-primary rounded-full border-4 border-background-dark cursor-pointer flex items-center justify-center hover:scale-110 transition-transform shadow-lg group">
                  <span class="material-symbols-outlined text-background-dark text-xl font-black">upload</span>
                  <input type="file" class="hidden" accept="image/*" @change="uploadAvatar" :disabled="uploading" />
                </label>
              </div>
              <h3 class="font-bold text-lg mb-1">{{ fullName || 'No Name' }}</h3>
              <p class="text-sm text-slate-500 mb-6">{{ userEmail }}</p>
              <div v-if="uploading" class="flex items-center justify-center gap-2 text-primary text-xs font-bold uppercase tracking-widest">
                <span class="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                Uploading...
              </div>
              <p v-else class="text-xs text-slate-500 uppercase font-black tracking-widest">Profile Photo</p>
            </div>
          </div>

          <!-- Account Details Card -->
          <div class="lg:col-span-2 space-y-8">
            <div class="bg-navy-accent/40 rounded-3xl border border-slate-800 p-8">
              <div class="mb-8">
                <h2 class="text-2xl font-bold mb-2">Account Details</h2>
                <p class="text-slate-400 text-sm">Update your public profile information.</p>
              </div>

              <form @submit.prevent="updateProfile" class="space-y-6">
                <div>
                  <label class="block text-sm font-bold text-primary uppercase tracking-widest mb-2">Full Name</label>
                  <div class="relative">
                    <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">person</span>
                    <input 
                      v-model="fullName"
                      type="text" 
                      class="w-full bg-background-dark border border-slate-700 rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Email (Non-changeable)</label>
                  <div class="relative">
                    <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">mail</span>
                    <input 
                      :value="userEmail"
                      type="email" 
                      disabled
                      class="w-full bg-background-dark/50 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-slate-600 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div class="pt-4">
                  <button 
                    type="submit" 
                    :disabled="saving"
                    class="bg-primary text-background-dark font-black px-10 py-4 rounded-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <span v-if="saving" class="material-symbols-outlined animate-spin">progress_activity</span>
                    <span v-else class="material-symbols-outlined">save</span>
                    {{ saving ? 'Saving Changes...' : 'Save Profile' }}
                  </button>
                </div>
              </form>

              <div v-if="message" :class="['mt-6 p-4 rounded-xl text-sm font-medium', message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20']">
                {{ message.text }}
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
import { supabase } from '../lib/supabase'
import { useRouter } from 'vue-router'

const router = useRouter()
const fullName = ref('')
const userEmail = ref('')
const avatarUrl = ref('')
const saving = ref(false)
const uploading = ref(false)
const profile = ref(null)
const message = ref(null)

const getProfile = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    router.push('/auth')
    return
  }
  
  userEmail.value = user.email
  
  let { data, error } = await supabase
    .from('profiles')
    .select(`full_name, avatar_url, username`)
    .eq('id', user.id)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.warn('Error fetching profile:', error)
  }

  if (data) {
    profile.value = data
    fullName.value = data.full_name || ''
    avatarUrl.value = data.avatar_url || ''
  }
}

const uploadAvatar = async (event) => {
  try {
    uploading.value = true
    const file = event.target.files[0]
    if (!file) return

    const { data: { user } } = await supabase.auth.getUser()
    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}/${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    // Upload image
    let { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath)

    // Update profile with new avatar URL
    const { error: updateError } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        avatar_url: publicUrl,
        updated_at: new Date()
      })

    if (updateError) throw updateError

    avatarUrl.value = publicUrl
    message.value = { type: 'success', text: 'Avatar updated successfully!' }
    setTimeout(() => { message.value = null }, 3000)
  } catch (error) {
    message.value = { type: 'error', text: error.message }
  } finally {
    uploading.value = false
  }
}

const updateProfile = async () => {
  saving.value = true
  message.value = null
  
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    const updates = {
      id: user.id,
      full_name: fullName.value,
      updated_at: new Date(),
    }

    let { error } = await supabase.from('profiles').upsert(updates)
    if (error) throw error
    
    message.value = { type: 'success', text: 'Profile updated successfully!' }
    setTimeout(() => { message.value = null }, 3000)
  } catch (error) {
    message.value = { type: 'error', text: error.message }
  } finally {
    saving.value = false
  }
}

const handleLogout = async () => {
  await supabase.auth.signOut()
  router.push('/auth')
}

onMounted(() => {
  getProfile()
})
</script>
