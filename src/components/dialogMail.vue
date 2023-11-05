<template>
  <q-dialog persistent>
    <q-card style="min-width: 350px" class="bg-blue-grey-10 text-white">
      <q-card-section>
        <div class="text-h6">Отправка письма</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          v-model="mailStore.mailRel.name"
          filled
          label="Название"
          input-class="text-white"
        />
        <q-input
          v-model="mailStore.mailRel.author"
          style="margin-top: 10px"
          filled
          label="От кого"
          input-class="text-white"
        />
        <q-input
          v-model="mailStore.mailRel.data"
          style="margin-top: 10px"
          filled
          label="Дата XX.XX.XXXX"
          input-class="text-white"
        />
        <q-input
          label="Сообщение"
          filled
          type="textarea"
          input-class="text-white"
          style="margin-top: 10px"
          v-model="mailStore.mailRel.description"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Отмена" v-close-popup />
        <q-btn
          flat
          label="Отправить"
          v-close-popup
          @click="mailStore.zapros2"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useCounterStore } from "src/stores/example-store";
export default {
  name: "dialogMail",

  setup() {
    const mailStore = useCounterStore();
    return {
      mailStore,
    };
  },
};
</script>
