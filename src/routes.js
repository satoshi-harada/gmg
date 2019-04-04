import BranchName from './components/BranchName.vue'
import CommitMessage from './components/CommitMessage.vue'
import Setting from './components/Setting.vue'

export const routes = [
  {
    path: '/',
    redirect: '/branch-name'
  },
  {
    path: '/branch-name',
    component: BranchName
  },
  {
    path: '/commit-message',
    component: CommitMessage
  },
  {
    path: '/setting',
    component: Setting
  }
]