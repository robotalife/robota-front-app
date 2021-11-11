<script>
import SwitchRadioGroup from '@/components/switch/SwitchRadioGroup.vue';
import FileInput from '@/components/input/FileInput.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import RadioButton from '@/components/button/RadioButton.vue';
import BaseInput from '@/components/input/BaseInput.vue';
import VBtn from 'vuetify/lib/components/VBtn';
import VIcon from 'vuetify/lib/components/VIcon';
export default {
  name: 'Wells',
  components: {
    SwitchRadioGroup,
    FileInput,
    BaseButton,
    VBtn,
    VIcon,
    RadioButton,
    BaseInput,
  },
  data() {
    return {
      setPropertiesItems: [
        { title: 'Manually', value: 'manually' },
        { title: 'From File', value: 'file' },
      ],
      switchGroup: 0,
      dialog2: false,
      dialog3: false,
      // sampleWellsPoint: [
      //   {
      //     x: '',
      //     y: '',
      //     z: '',
      //   },
      // ],
      newWells: {
        wellType: 'INJ',
        coordinateType: 'IJK_LIST',
        points: [
          {
            x: '',
            y: '',
            z: '',
          },
          {
            x: '',
            y: '',
            z: '',
          },
        ],
        constraint: {
          constraintType: 'PRESSURE',
          value: '',
        },
        formula: {
          formulaType: 'PI',
          value: '',
        },
        boundaryCondition: {
          boundaryConditionType: 'TEMPERATURE',
          value: '',
        },
      },
      expandItems: [
        { label: 'Well Type', component: 'Well' },
        { label: 'Cordinate', component: 'Cordinate' },
        { label: 'Constraint', component: 'Constraint' },
        { label: 'Formula', component: 'Formula' },
        { label: 'Boundry Condition', component: 'Boundry' },
      ],
      radioItems: [
        {
          label: 'Inj',
          value: 'INJ',
          name: 'wellType',
          section: '',
        },
        {
          label: 'Prod',
          value: 'Prod',
          name: 'wellType',
          section: '',
        },
      ],
      ConstraintRadio: [
        {
          label: ' Pressure [Pa]',
          value: ' Pressure',
          name: 'constraintType',
          section: 'constraint',
        },
        {
          label: ' Rate [m3/day]',
          value: ' Rate',
          name: 'constraintType',
          section: 'constraint',
        },
      ],
      FormulaRadio: [
        {
          label: 'Productivity Index "PI" [m3/day/Pa]',
          value: 'PI',
          name: 'formulaType',
          section: 'formula',
        },
        {
          label: 'Well Index "WI" 13/day/Pa',
          value: 'WI',
          name: 'formulaType',
          section: 'formula',
        },
      ],
      BoundryRadio: [
        {
          label: 'temperature [K]',
          value: 'TEMPERATURE',
          name: 'boundaryConditionType',
          section: 'boundaryCondition',
        },
        {
          label: 'enthalpy [J/Kg]',
          value: 'ENTHALPLY',
          name: 'boundaryConditionType',
          section: 'boundaryCondition',
        },
      ],
      // samplePoint: [
      //   {
      //     label: '',
      //     unit: 'x',
      //     name: 'x',
      //     section: 'points',
      //     defaultValue: '',
      //   },
      //   {
      //     label: '',
      //     unit: 'y',
      //     name: 'y',
      //     section: 'points',
      //     defaultValue: '',
      //   },
      //   {
      //     label: '',
      //     unit: 'z',
      //     name: 'z',
      //     section: 'points',
      //     defaultValue: '',
      //   },
      // ],
      cordinateItems: '',
      //   {
      //     label: '',
      //     unit: 'x',
      //     name: 'x',
      //     section: 'points',
      //     defaultValue: '',
      //   },
      //   {
      //     label: '',
      //     unit: 'y',
      //     name: 'y',
      //     section: 'points',
      //     defaultValue: '',
      //   },
      //   {
      //     label: '',
      //     unit: 'z',
      //     name: 'z',
      //     section: 'points',
      //     defaultValue: '',
      //   },
      //   {
      //     label: '',
      //     unit: 'x',
      //     name: 'x',
      //     section: 'points',
      //     defaultValue: '',
      //   },
      //   {
      //     label: '',
      //     unit: 'y',
      //     name: 'y',
      //     section: 'points',
      //     defaultValue: '',
      //   },
      //   {
      //     label: '',
      //     unit: 'z',
      //     name: 'z',
      //     section: 'points',
      //     defaultValue: '',
      //   },
      // ],
      // sampleWells: {
      //   coordinate: [
      //     {
      //       x: '',
      //       y: '',
      //       z: '',
      //     },
      //     {
      //       x: '',
      //       y: '',
      //       z: '',
      //     },
      //   ],
      //   constraint: {
      //     first: 'PRESSURE',
      //     second: '5e7',
      //   },
      //   formula: {
      //     first: 'PI',
      //     second: '1e9',
      //   },
      //   boundry: {
      //     first: 'TEMPERATURE',
      //     second: '300',
      //   },
      // },
      wellsItems: [
        {
          coordinate: [
            {
              x: this.$store.state?.config.configs?.wells[0]?.points[0]?.x,
              y: this.$store.state?.config.configs?.wells[0]?.points[0]?.y,
              z: this.$store.state?.config.configs?.wells[0]?.points[0]?.z,
            },
            {
              x: this.$store.state?.config.configs?.wells[0]?.points[1]?.x,
              y: this.$store.state?.config.configs?.wells[0]?.points[1]?.y,
              z: this.$store.state?.config.configs?.wells[0]?.points[1]?.z,
            },
          ],
          constraint: {
            first: this.$store.state?.config.configs?.wells[0]?.constraint
              ?.constraintType,
            second: this.$store.state?.config.configs?.wells[0]?.constraint
              ?.value,
          },
          formula: {
            first: this.$store.state?.config.configs?.wells[0]?.formula
              ?.formulaType,
            second: this.$store.state?.config.configs?.wells[0]?.formula?.value,
          },
          boundry: {
            first: this.$store.state?.config.configs?.wells[0]
              ?.boundaryCondition?.boundaryConditionType,
            second: this.$store.state?.config.configs?.wells[0]
              ?.boundaryCondition?.value,
          },
        },
        {
          coordinate: [
            {
              x: this.$store.state?.config.configs?.wells[1]?.points[0]?.x,
              y: this.$store.state?.config.configs?.wells[1]?.points[0]?.y,
              z: this.$store.state?.config.configs?.wells[1]?.points[0]?.z,
            },
            {
              x: this.$store.state?.config.configs?.wells[1]?.points[1]?.x,
              y: this.$store.state?.config.configs?.wells[1]?.points[1]?.y,
              z: this.$store.state?.config.configs?.wells[1]?.points[1]?.z,
            },
          ],
          constraint: {
            first: this.$store.state?.config.configs?.wells[1]?.constraint
              ?.constraintType,
            second: this.$store.state?.config.configs?.wells[1]?.constraint
              ?.value,
          },
          formula: {
            first: this.$store.state?.config.configs?.wells[1]?.formula
              ?.formulaType,
            second: this.$store.state?.config.configs?.wells[1]?.formula?.value,
          },
          boundry: {
            first: this.$store.state?.config.configs?.wells[1]
              ?.boundaryCondition?.boundaryConditionType,
            second: this.$store.state?.config.configs?.wells[1]
              ?.boundaryCondition.value,
          },
        },
      ],
    };
  },
  created() {
    this.cleanWells();
  },
  methods: {
    changedSwitch(value) {
      this.switchGroup = value;
    },
    cleanWells() {
      if (location.href.includes('new')) {
        this.wellsItems = [];
      }
    },
    createNewWells() {
      return {
        wellType: 'INJ',
        coordinateType: 'IJK_LIST',
        points: [
          {
            x: '',
            y: '',
            z: '',
          },
          {
            x: '',
            y: '',
            z: '',
          },
        ],
        constraint: {
          constraintType: 'PRESSURE',
          value: '',
        },
        formula: {
          formulaType: 'PI',
          value: '',
        },
        boundaryCondition: {
          boundaryConditionType: 'TEMPERATURE',
          value: '',
        },
      };
    },
    createCordinates() {
      return [
        {
          label: '',
          unit: 'x',
          name: 'x',
          section: 'points',
          defaultValue: '',
        },
        {
          label: '',
          unit: 'y',
          name: 'y',
          section: 'points',
          defaultValue: '',
        },
        {
          label: '',
          unit: 'z',
          name: 'z',
          section: 'points',
          defaultValue: '',
        },
        {
          label: '',
          unit: 'x',
          name: 'x',
          section: 'points',
          defaultValue: '',
        },
        {
          label: '',
          unit: 'y',
          name: 'y',
          section: 'points',
          defaultValue: '',
        },
        {
          label: '',
          unit: 'z',
          name: 'z',
          section: 'points',
          defaultValue: '',
        },
      ];
    },
    openDialog() {
      this.dialog2 = true;
    },
    removePoint(index) {
      this.cordinateItems.splice(index - 2, 3);
      this.newWells.points.splice(index / 3, 1);
    },
    sampleWellsPoint() {
      return [
        {
          x: '',
          y: '',
          z: '',
        },
      ];
    },
    samplePoint() {
      return [
        {
          label: '',
          unit: 'x',
          name: 'x',
          section: 'points',
          defaultValue: '',
        },
        {
          label: '',
          unit: 'y',
          name: 'y',
          section: 'points',
          defaultValue: '',
        },
        {
          label: '',
          unit: 'z',
          name: 'z',
          section: 'points',
          defaultValue: '',
        },
      ];
    },
    addPoint() {
      this.cordinateItems = this.cordinateItems.concat(this.samplePoint());
      this.newWells.points = this.newWells.points.concat(
        this.sampleWellsPoint()
      );
    },
    changeNewWlls(e) {
      e.preventDefault();
      const value = e.target.value;
      const section = e.target.dataset.section;
      const name = e.target.name;
      const next = e.target.dataset.next;
      console.log(name, value, section, next, 'change');
      if (next) {
        const index = Math.floor(Number(next) / 3);
        this.newWells[section][index][name] = value;
      } else if (section) {
        this.newWells[section][name] = value;
      } else {
        this.newWells[name] = value;
      }
      console.log(this.newWells);
    },
    sampleWells() {
      return {
        coordinate: [
          {
            x: '',
            y: '',
            z: '',
          },
          {
            x: '',
            y: '',
            z: '',
          },
        ],
        constraint: {
          first: 'PRESSURE',
          second: '5e7',
        },
        formula: {
          first: 'PI',
          second: '1e9',
        },
        boundry: {
          first: 'TEMPERATURE',
          second: '300',
        },
      };
    },
    finalAdd(e) {
      e.preventDefault();
      console.log(this.newWells.points);
      let wellsObj = this.sampleWells();
      wellsObj.coordinate = this.newWells.points;
      wellsObj.constraint.first = this.newWells.constraint.constraintType;
      wellsObj.constraint.second = this.newWells.constraint.value;
      wellsObj.formula.first = this.newWells.formula.formulaType;
      wellsObj.formula.second = this.newWells.formula.value;
      wellsObj.boundry.first = this.newWells.boundaryCondition.boundaryConditionType;
      wellsObj.boundry.second = this.newWells.boundaryCondition.value;
      this.wellsItems = this.wellsItems.concat(wellsObj);
      this.dialog3 = false;
      this.$store.commit('SET_WELLS', this.newWells);
      this.newWells = '';
      this.cordinateItems = '';
      this.newWells = this.createNewWells();
    },
    addNewWells() {
      this.dialog2 = false;
      this.cordinateItems = this.createCordinates();
      this.dialog3 = true;
    },
    closeWells() {
      this.dialog3 = false;
    },
  },
};
</script>

<template>
  <div>
    <div class="d-flex jc-between ai-center">
      <p class="font-14-24 g-100 m-0">Set Wells</p>
      <SwitchRadioGroup :items="setPropertiesItems" @clicked="changedSwitch" />
    </div>
    <v-tabs-items v-model="switchGroup">
      <v-tab-item :transition="false">
        <div class="d-flex ai-center m-t-4">
          <div class="w-1-1" @click.prevent="openDialog">
            <BaseButton
              size="small"
              text="Define Wells"
              class="bg-g-80 Wells__btn-define w-1-1"
            />
          </div>
          <VBtn class="Wells__btn-download bg-db-10 m-l-1" dark depressed>
            <VIcon dark>$download</VIcon>
          </VBtn>
        </div>
      </v-tab-item>
      <v-tab-item :transition="false">
        <FileInput class="m-t-4" />
      </v-tab-item>
    </v-tabs-items>
    <!-- @click="dialog3 = !dialog3" -->
    <v-dialog v-model="dialog3" width="520">
      <form @change="changeNewWlls">
        <div class="d-flex ai-center jc-between p-y-2 p-x-3 bg-white">
          <p class="font-20-32 g-100 fw-600">New Well</p>
        </div>
        <v-expansion-panels class="Wells__container">
          <v-expansion-panel v-for="(item, i) in expandItems" :key="i">
            <v-expansion-panel-header
              class="Wells__item m-0 font-16-24 g-100 fw-500"
              expand-icon="$arrowDown"
            >
              {{ item.label }}
            </v-expansion-panel-header>
            <v-expansion-panel-content class="p-x-1">
              <RadioButton
                v-if="item.component === 'Well'"
                :items="radioItems"
                :selected="radioItems[0].value"
              />
              <div
                v-else-if="item.component === 'Cordinate' && cordinateItems"
                class="Wells__cordinate"
              >
                <div
                  v-for="(cordinate, index) in cordinateItems"
                  :key="index"
                  class="d-flex ai-center"
                >
                  <BaseInput
                    :label="cordinate.label"
                    :unit="cordinate.unit"
                    :name="cordinate.name"
                    :section="cordinate.section"
                    :default="cordinate.defaultValue"
                    :next="index.toString()"
                  />
                  <div
                    v-if="index === cordinateItems.length - 1 && index > 5"
                    class="Wells__cancel-point bg-db-05 m-l-1"
                    :data-value="index"
                    @click="removePoint(index)"
                  >
                    <VIcon dark>$cross</VIcon>
                  </div>
                </div>
                <div @click.prevent="addPoint">
                  <BaseButton
                    class="bg-g-80 Wells__btn-define"
                    text="+Add Point"
                    size="small"
                  />
                </div>
              </div>
              <div
                v-else-if="item.component === 'Constraint'"
                class="d-flex flex-col"
              >
                <RadioButton
                  :items="ConstraintRadio"
                  :selected="ConstraintRadio[0].value"
                  class="m-b-3"
                />
                <BaseInput
                  label=""
                  name="value"
                  section="constraint"
                  default=""
                />
              </div>
              <div
                v-else-if="item.component === 'Formula'"
                class="d-flex flex-col"
              >
                <RadioButton
                  :items="FormulaRadio"
                  :selected="FormulaRadio[0].value"
                  class="m-b-3 flex-col jc-between"
                />
                <BaseInput label="" name="value" section="formula" />
              </div>
              <div
                v-else-if="item.component === 'Boundry'"
                class="d-flex flex-col"
              >
                <RadioButton
                  :items="BoundryRadio"
                  :selected="BoundryRadio[0].value"
                  class="m-b-3"
                />
                <BaseInput label="" name="value" section="boundaryCondition" />
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <!-- <hr /> -->
        <div class="p-y-1-5 p-x-2 bg-white d-flex jc-between ai-center">
          <div class="w-1-3" @click.prevent="closeWells">
            <BaseButton
              class="bg-white Wells__btn-cancel w-1-1"
              text="Cancel"
              size="small"
            />
          </div>
          <div class="w-1-3" @click="finalAdd">
            <BaseButton
              class="bg-primary Wells__btn--white w-1-1"
              text="Add"
              size="small"
            />
          </div>
        </div>
      </form>
    </v-dialog>
    <v-dialog v-model="dialog2" width="550">
      <div class="d-flex ai-center jc-between p-y-2 p-x-3 bg-white">
        <p class="font-20-32 g-100 fw-600">Wells Management</p>
        <div @click="dialog2 = false">
          <VIcon dark>$cross</VIcon>
        </div>
      </div>
      <hr />
      <div class="d-flex p-y-2 p-x-3 bg-white">
        <div class="w-1-2" @click="addNewWells">
          <BaseButton
            size="small"
            text="+ Add Well"
            class="bg-g-80 Wells__btn--white w-1-1"
          />
        </div>
        <BaseButton
          size="small"
          text="Export"
          class="bg-white Wells__btn-export m-l-2 w-1-2"
        />
      </div>
      <hr />
      <div class="p-3 bg-white">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left font-12-16 g-50">Coordination</th>
                <th class="text-left font-12-16 g-50">Constraint</th>
                <th class="text-left font-12-16 g-50">Formula</th>
                <th class="text-left font-12-16 g-50">Boundry Condition</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in wellsItems" :key="index">
                <td>
                  <div>
                    <p
                      v-for="(value, counter) in item.coordinate"
                      :key="counter"
                      class="font-14-24 g-100"
                    >
                      {{ [value['x'], value['y'], value['z']] }}
                    </p>
                  </div>
                </td>
                <td>
                  <div>
                    <p class="font-14-24 g-100">{{ item.constraint.first }}</p>
                    <p class="font-14-24 g-100">{{ item.constraint.second }}</p>
                  </div>
                </td>
                <td>
                  <div>
                    <p class="font-14-24 g-100">{{ item.formula.first }}</p>
                    <p class="font-14-24 g-100">{{ item.formula.second }}</p>
                  </div>
                </td>
                <td>
                  <div>
                    <p class="font-14-24 g-100">{{ item.boundry.first }}</p>
                    <p class="font-14-24 g-100">{{ item.boundry.second }}</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
      <hr />
      <div class="p-y-1-5 p-x-2 bg-white d-flex flex-row-reverse">
        <div class="w-1-3" @click="dialog2 = false">
          <BaseButton
            class="bg-primary Wells__btn--white w-1-1"
            text="Save Changes"
            size="small"
          />
        </div>
      </div>
    </v-dialog>
  </div>
</template>
<style scoped lang="scss">
@import '@/styles/global/color';
@import '@/styles/utils/bem';

.Wells {
  @include e(btn) {
    &-define {
      width: 100%;
      color: $white;
    }

    &-export {
      border: 1px solid $dark-blue-20;
      color: $gray-100;
      max-width: 220px !important;
    }

    &-download {
      padding: 8px !important;
      max-width: 40px !important;
      min-height: 40px !important;
      min-width: 40px !important;
    }

    &-cancel {
      background-color: $white !important;
      border: 1px solid $dark-blue-20;
      color: $gray-100;
    }

    @include m(white) {
      color: $white;
    }
  }

  @include e(container) {
    .v-expansion-panel {
      margin: 0px;
    }
  }
  @include e(item) {
    max-height: 40px;
    min-height: 40px !important;
    margin: 0 0 32px;
    padding: 8px 32px;
    box-shadow: inset 0 -1px 0 0 $dark-blue-05, inset 0 1px 0 0 $dark-blue-05;
    background-color: $dark-blue-05;
  }

  @include e(expand-container) {
    &:only-child.v-expansion-panel-content__wrap {
      padding: 0px !important;
    }
  }

  @include e(cordinate) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 16px;
    grid-row-gap: 24px;
  }

  @include e(cancel-point) {
    height: 24px;
    width: 24px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .v-icon__component {
      height: 18px;
      width: 18px;
    }
  }
}
</style>
