import { useI18n } from 'vue-i18n';

export function useCV() {
  const { locale } = useI18n();

  const cvUrl = computed(() => {
    return locale.value === 'fr' ? '/CV_MW_FR.pdf' : '/CV_MW_EN.pdf';
  });

  const fileName = computed(() => {
    return locale.value === 'fr' ? 'Mikael_Wawrziczny_CV_FR.pdf' : 'Mikael_Wawrziczny_CV_EN.pdf';
  });

  return {
    cvUrl,
    fileName,
  };
}
