<template>
  <div class="multiSelect">
    <div v-click-outside="close" class="list" @click="toggleOpen">
      <span class="title">{{ titleWithCount }}</span>
      <span><i class="chevron"></i></span>
    </div>
    <div v-if="listIsOpen" class="dropdown-list">
      <div
        v-for="item in items"
        :key="item"
        class="option"
        @click="toggleItem(item)"
      >
        <input
          type="checkbox"
          :name="item"
          :checked="selected.includes(item)"
        />
        {{ item.toUpperCase() }}
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
export default {
  name: "multiSelect",
  directives: {
    ClickOutside,
  },
  props: {
    title: String,
    items: Array,
    selected: Array,
  },
  data: () => {
    return {
      listIsOpen: false,
    };
  },
  methods: {
    toggleItem(item) {
      const arr = [...this.selected];
      if (!arr.includes(item)) {
        arr.push(item);
      } else {
        arr.splice(arr.indexOf(item), 1);
      }
      this.$emit("change", arr);
    },
    toggleOpen() {
      this.listIsOpen = !this.listIsOpen;
    },
    close() {
      this.listIsOpen = false;
    },
  },
  computed: {
    titleWithCount() {
      const title = this.title.toUpperCase();
      return this.selected.length > 0
        ? `${title} (${this.selected.length})`
        : title;
    },
  },
  mounted() {
    this.popupItem = this.$el;
  },
};
</script>

<style lang="scss" scoped>
.multiSelect {
  position: relative;

  .list {
    --background-color: #f6f6f6;
    --accent-color: #7b7b7b;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--background-color);
    padding: 5px;
    margin-right: 20px;
    border-bottom: 2px solid var(--accent-color);
    color: var(--accent-color);

    .title {
      padding-right: 100px;
    }

    .chevron {
      margin-top: 10px;
      position: relative;
      display: block;
      height: 20px;
      width: 20px;
    }
    .chevron:before,
    .chevron:after {
      position: absolute;
      display: block;
      content: "";
      border: 10px solid transparent;
    }
    .chevron:before {
      top: 0;
      border-top-color: var(--accent-color);
    }
    .chevron:after {
      top: -5px;
      border-top-color: #fff;
    }
  }
  .dropdown-list {
    position: absolute;
    background-color: #fff;
    width: 100%;
    top: 50px;

    .option {
      padding: 10px 0;
      border-bottom: 1px solid var(--accent-color);
    }
  }

  .dropdown-list:hover {
    cursor: pointer;
  }
  .list:hover {
    cursor: pointer;
  }
}
</style>
