import { defineStore } from "pinia";
import axios from "axios";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    mail: [
      // Маасив входящих
      [],
      // Маасив исходящих
      [],
      // Маасив черновиков
      [],
    ],
    // Маасив выбранных строк
    selected: [],
    // Объект отправки сообщения
    mailRel: {
      name: "",
      description: "",
      data: "",
      author: "",
    },
    // Колонки таблиц
    columns: [
      {
        name: "name",
        required: true,
        label: "Название",
        align: "left",
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "data",
        align: "left",
        label: "Дата",
        field: "data",
        sortable: true,
      },
      {
        name: "author",
        align: "left",
        label: "От кого",
        field: "author",
        sortable: true,
      },
      {
        name: "description",
        align: "center",
        label: "Сообщение",
        field: "description",
        sortable: true,
      },
    ],
    // Объект фильтрации
    filtered: {
      day: "",
      Month: "",
      Years: "",
    },
    // Маасив инпутов фильтрации
    options: [
      [
        "",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
      ],
      [
        "",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ],
      ["", "2021", "2022", "2023", "2024"],
    ],
    // Номер страницы , равен индексу массива в mails
    page: 0,
  }),

  actions: {
    // Функция удаления из бд и из массива входящих
    remove() {
      this.selected.forEach((element) =>
        axios
          .delete("http://localhost:5000/mail/" + element.id)
          .then(
            (response) =>
              (this.mail[0] = this.mail[0].filter(
                (m) => m.id !== response.data
              ))
          )
      );
      this.selected = [];
    },
    // Функция удаления из бд и из массива исходящих
    removeOuts() {
      this.selected.forEach((element) =>
        axios
          .delete("http://localhost:5000/outs/" + element.id)
          .then(
            (response) =>
              (this.mail[1] = this.mail[1].filter(
                (m) => m.id !== response.data
              ))
          )
      );
      this.selected = [];
    },
    // Функция удаления из бд и из массива черновиков
    removeDelt() {
      this.selected.forEach((element) =>
        axios
          .delete("http://localhost:5000/delt/" + element.id)
          .then(
            (response) =>
              (this.mail[2] = this.mail[2].filter(
                (m) => m.id !== response.data
              ))
          )
      );
      this.selected = [];
    },
    // Функция создания и проверки требований сообщения , внос в бд черновиков
    zapros2() {
      if (
        this.mailRel.name.length > 40 ||
        this.mailRel.name.length < 5 ||
        this.mailRel.description.length > 100 ||
        this.mailRel.description.length < 15 ||
        this.mailRel.author.length > 40 ||
        this.mailRel.author.length < 5
      ) {
        this.mailRel = {
          name: "",
          description: "",
          data: "",
          author: "",
        };
        alert(
          "Название: не менее 5сим и не больше 40сим. , Сообщение: не менее 15сим и не больше 100сим , Автор: не менее 5сим и не больше 40сим."
        );
      } else {
        axios
          .post("http://localhost:5000/delt", {
            name: this.mailRel.name,
            description: this.mailRel.description,
            data: this.mailRel.data,
            author: this.mailRel.author,
          })
          .then((response) => this.mail[2].push(response.data)),
          (this.mailRel = {
            name: "",
            description: "",
            data: "",
            author: "",
          });
      }
    },
    // Функция запроса писем из бд в входящие
    zapros() {
      axios
        .get("http://localhost:5000/mail", {})
        .then((response) =>
          response.data.forEach((element) => this.mail[0].push(element))
        );
    },
    // Функция "Отправить все" , полный перенос из черновиков в исходящие
    zapros3() {
      console.log(
        String(
          this.filtered.day +
            "." +
            this.filtered.Month +
            "." +
            this.filtered.Years
        )
      );
      this.mail[2].forEach((element) =>
        axios
          .post("http://localhost:5000/outs", {
            name: element.name,
            description: element.description,
            data: element.data,
            author: element.author,
          })
          .then((response) => this.mail[1].push(response.data))
      );
      this.mail[2].forEach((element) =>
        axios.delete("http://localhost:5000/delt/" + element.id)
      );
      this.mail[2] = [];
    },
    // Функция обнуления объекта фильтрации и массива выбранных писем , при переходе на другую страницу
    pageEddit() {
      (this.selected = []),
        (this.filtered = {
          day: "",
          Month: "",
          Years: "",
        });
    },
  },

  getters: {
    // Computed свойство фильтрации , именно оно передается в rows таблицы
    filterMain() {
      const generateData =
        this.filtered.day +
        "." +
        this.filtered.Month +
        "." +
        this.filtered.Years;
      if (generateData == "..") {
        return this.mail[this.page];
        // Фильтрация по дню
      } else if (generateData == this.filtered.day + "..") {
        return this.mail[this.page].filter(
          (m) => m.data.substr(0, 2) == this.filtered.day
        );
      }
      // Фильтрация по дню и месяцу
      else if (
        generateData ==
        this.filtered.day + "." + this.filtered.Month + "."
      ) {
        return this.mail[this.page].filter((m) =>
          m.data.includes(this.filtered.day + "." + this.filtered.Month)
        );
      }
      // Фильтрация по месяцу
      else if (generateData == "." + this.filtered.Month + ".") {
        return this.mail[this.page].filter(
          (m) => m.data.substr(3, 2) == this.filtered.Month
        );
      }
      // Фильтрация по меяцу и году
      else if (
        generateData ==
        "." + this.filtered.Month + "." + this.filtered.Years
      ) {
        return this.mail[this.page].filter((m) =>
          m.data.includes(this.filtered.Month + "." + this.filtered.Years)
        );
      }
      // Фильтрация по году
      else if (generateData == ".." + this.filtered.Years) {
        return this.mail[this.page].filter(
          (m) => m.data.substr(6, 4) == this.filtered.Years
        );
      }
      // Фильтрация по году и дню
      else if (generateData == this.filtered.day + ".." + this.filtered.Years) {
        return this.mail[this.page].filter(
          (m) =>
            m.data.substr(0, 2) == this.filtered.day &&
            m.data.substr(6, 4) == this.filtered.Years
        );
      } else {
        return this.mail[this.page].filter((m) => m.data === generateData);
      }
    },
  },
});
