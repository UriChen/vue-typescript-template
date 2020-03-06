import i18n from '@/lang'
// translate router.meta.title, be used in breadcrumb sidebar tagsview
export function generateTitle(title: string) {
  const hasKey = i18n.te('route.' + title)
  if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    return i18n.t('route.' + title)
  }
  return title
}
