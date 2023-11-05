<template>
  <q-page class="flex flex-center column">
    <div style="width: 100%" align="right">
      <div class="filterData">
        <q-btn
          v-if="mailStore.selected.length > 0"
          style="margin-right: 15px"
          square
          color="red-6"
          icon="delete"
          @click="mailStore.removeDelt"
        />
        <q-select
          label-color="white"
          color="white"
          class="filterSelect"
          filled
          v-model="mailStore.filtered.day"
          :options="mailStore.options[0]"
          label="День"
        />
        <q-select
          label-color="white"
          color="white"
          class="filterSelect"
          filled
          v-model="mailStore.filtered.Month"
          :options="mailStore.options[1]"
          label="Месяц"
        />
        <q-select
          label-color="white"
          color="white"
          class="filterSelect"
          filled
          v-model="mailStore.filtered.Years"
          :options="mailStore.options[2]"
          label="Год"
        />
      </div>
    </div>
    <q-table
      flat
      title="Черновики"
      :rows="mailStore.filterMain"
      :columns="mailStore.columns"
      @row-click="prompt"
      row-key="id"
      selection="multiple"
      v-model:selected="mailStore.selected"
      dark
      style="width: 100%; margin-bottom: auto"
    >
    </q-table>
  </q-page>
  <q-dialog position="top" v-model="alert">
    <q-card class="d-flex flex-column flex-center" style="max-width: 300px">
      <q-card-section>
        <div class="text-h6">Наиминование: {{ now.name }}</div>
        <div>От кого: {{ now.author }}</div>
        <div>Дата: {{ now.data }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ now.description }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import { hooksTable } from "src/hooks/hookTable";
import { useCounterStore } from "src/stores/example-store";

export default defineComponent({
  name: "index-page",

  setup() {
    const { prompt, now, alert } = hooksTable();
    const mailStore = useCounterStore();
    return {
      prompt,
      mailStore,
      alert,
      now,
    };
  },
});
</script>

<style></style>
