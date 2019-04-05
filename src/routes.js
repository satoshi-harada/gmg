import BranchName from './components/BranchName.vue'
import CommitMessage from './components/CommitMessage.vue'
import Setting from './components/Setting.vue'

export const routes = [
  {
    path: '/',
    redirect: '/commit-message'
  },
  {
    path: '/commit-message',
    component: CommitMessage
  },
  {
    path: '/branch-name',
    component: BranchName
  },
  {
    path: '/setting',
    component: Setting
  }
]