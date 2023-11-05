<template>
  <q-layout view="lHh Lpr lFf">
    <div class="flex flex-center" style="justify-content: space-between">
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
        class="text-white"
        style="font-size: 20px"
      />
      <div style="display: inline">
        <q-btn
          style="margin-right: 20px"
          unelevated
          icon="mail"
          size="11px"
          rounded
          color="grey-8"
          label="Написать письмо "
          @click="prompt2"
        />
      </div>
    </div>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      style="background-color: #183550"
      class="text-white"
    >
      <div class="header_menu">
        <span class="q-pa-md" style="font-size: 20px">Почта</span>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          style="font-size: 20px"
        />
      </div>
      <q-list>
        <q-separator dark inset />

        <q-list class="q-pa-md" align="left">
          <span @click="mailStore.pageEddit">
            <q-item
              @click="mailStore.page = label.leng"
              v-for="label in labelLink"
              :key="label.title"
              clickable
              :to="label.link"
            >
              <q-item-section v-if="label.icon" avatar>
                <q-icon :name="label.icon" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ label.title }}</q-item-label>
              </q-item-section>

              <q-item-section class="items-end">
                <q-item-label>
                  <div class="q-gutter-md">
                    <q-badge color="grey-9">{{
                      mailStore.mail[label.leng].length
                    }}</q-badge>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </span>
        </q-list>
        <div class="q-pa-md flex flex-center">
          <q-btn
            rounded
            color="grey-9"
            size="md"
            label="Отправить все"
            @click="mailStore.zapros3"
          />
          <q-btn
            rounded
            color="grey-9"
            size="md"
            label="Получить письма"
            style="margin-top: 15px"
            @click="mailStore.zapros"
          />
        </div>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { hooksTable } from "../hooks/hookTable";
import { useCounterStore } from "src/stores/example-store";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const { prompt2 } = hooksTable();
    const mailStore = useCounterStore();
    return { prompt2, mailStore };
  },

  data() {
    return {
      leftDrawerOpen: false,

      labelLink: [
        {
          title: "Входящие",
          icon: "forward_to_inbox",
          link: "/main",
          leng: 0,
        },
        {
          title: "Отправленные",
          icon: "send",
          link: "/messageSend",
          leng: 1,
        },
        {
          title: "Черновики",
          icon: "delete",
          link: "/messagedel",
          leng: 2,
        },
      ],
    };
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
});
</script>
