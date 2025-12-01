import { ref } from 'vue';

const isOpen = ref(false);
const project = ref<any>(null);

export function useProjectModal() {
  function openProject(p: any) {
    project.value = p;
    isOpen.value = true;
  }

  function closeProject() {
    isOpen.value = false;
    project.value = null;
  }

  return {
    isOpen,
    project,
    openProject,
    closeProject,
  };
}
