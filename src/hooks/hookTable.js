import { ref } from "vue";
import { useQuasar } from "quasar";
import dialogMail from "../components/dialogMail.vue";

export function hooksTable() {
  const alert = ref(false);
  const now = ref();
  const prompt = (evt, row) => {
    alert.value = true;
    now.value = row;
  };
  const $q = useQuasar();

  function prompt2() {
    $q.dialog({
      component: dialogMail,
    });
  }

  return {
    prompt,
    prompt2,
    alert,
    now,
  };
}
