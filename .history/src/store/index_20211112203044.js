import Vue from "vue";
import Vuex from "vuex";
import sampleConfig from "./sampleConfig";
// import storage from '@/utils/storage';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // user: storage.getItem('user'),
    config: {
      id: "",
      name: "Immiscible_SPE10T",
      configs: {
        projectId: "",
        title: "Immiscible_SPE10T",
        domain: {
          domainType: "FromValues",
          filename: "string",
          lenX: "220",
          lenY: "60",
          lenZ: "1",
          gridCellsX: "100",
          gridCellsY: "100",
          gridCellsZ: "1",
          gridDiscretization: "CartesianGrid",
        },
        permeability: {
          permeabilityUnit: "M2",
          point: {
            x: "1e-14",
            y: "1e-14",
            z: "1e-14",
          },
          averagePermeabilityAndContrast: true,
          permeabilityAverage: 10,
          permeabilityContrastLog: 5,
        },
        relativePermeabilityFunctions: {
          funcName: "Linear",
          srwRelperm: 0,
          srnwRelperm: 0,
          krewRelperm: 1,
          krenwRelperm: 1,
          wettingPhaseRelperm: 1,
          nonWettingPhaseRelperm: 1,
        },
        porosity: {
          value: 0.2,
        },
        gravity: {
          customGravity: false,
          point: {
            x: "0",
            y: "0",
            z: "0",
          },
        },
        fluid: {
          name: "Immiscible",
          numberOfPhases: "TwoPhase",
          phase1Density: "1000",
          phase1Viscosity: "1e-3",
          phase1Compressibility: "0e-9",
          phase1HeatConductivity: "0.6",
          phase1SpecificHeat: "4200",
          phase1DissolutionIntoPhase2: "0",
          phase2Density: "800",
          phase2Viscosity: "1e-3",
          phase2Compressibility: "0e-9",
          phase2HeatConductivity: "0.1",
          phase2SpecificHeat: "8000",
          phase2DissolutionIntoPhase1: "0",
        },
        rock: {
          name: "Sandstone",
          density: "2600",
          compressibility: "0e-8",
          heatConductivity: "3.0",
          specificHeat: "850",
        },
        capillarity: {
          capillaritySwitch: false,
          capillarityType: "Linear",
        },
        initialConditions: {
          initialPressure: "1e7",
          InitialConditionType: "Temperature",
          value: "400",
          initialSaturation1: "0.0",
        },
        wells: [
          {
            wellType: "INJ",
            coordinateType: "IJK_LIST",
            points: [
              {
                x: "1",
                y: "1",
                z: "1",
              },
              {
                x: "1",
                y: "1",
                z: "NZ",
              },
            ],
            constraint: {
              constraintType: "PRESSURE",
              value: "5e7",
            },
            formula: {
              formulaType: "WI",
              value: "1e9",
            },
            boundaryCondition: {
              boundaryConditionType: "TEMPERATURE",
              value: "300",
            },
          },
          {
            wellType: "PROD",
            coordinateType: "IJK_LIST",
            points: [
              {
                x: "NX",
                y: "NY",
                z: "1",
              },
              {
                x: "NX",
                y: "NY",
                z: "NZ",
              },
            ],
            constraint: {
              constraintType: "PRESSURE",
              value: "1e7",
            },
            formula: {
              formulaType: "WI",
              value: "1e9",
            },
            boundaryCondition: {
              boundaryConditionType: "TEMPERATURE",
              value: "300",
            },
          },
        ],
        simulation: {
          simulationTime: {
            value: 200,
            simulationTimeUnit: "Days",
          },
          maximumTimesteps: 2500,
          reportsNumber: 100,
          minTimestepSize: "1",
          maxTimestepSize: "30",
          outputFormat: 2,
          fullyImplicitMethod: {
            maximumNonlinearIterations: "20",
            nonlinearResidualToleranceEquation1: "1e-5",
            nonlinearResidualToleranceEquation2: "1e-5",
            nonlinearSolutionToleranceUnknown1: "1e-4",
            nonlinearSolutionToleranceUnknown2: "1e-3",
            maximumSizeOfCfl: "100",
          },
        },
      },
    },
    // sampleConfig: {
    //   id: '',
    //   name: 'Untitled simulation',
    //   configs: {
    //     projectId: '',
    //     title: 'Untitled simulation',
    //     domain: {
    //       domainType: 'FromValues',
    //       filename: 'string',
    //       lenX: '',
    //       lenY: '',
    //       lenZ: '',
    //       gridCellsX: '',
    //       gridCellsY: '',
    //       gridCellsZ: '',
    //       gridDiscretization: 'CartesianGrid',
    //     },
    //     permeability: {
    //       permeabilityUnit: 'M2',
    //       point: {
    //         x: '',
    //         y: '',
    //         z: '',
    //       },
    //       averagePermeabilityAndContrast: true,
    //       permeabilityAverage: 10,
    //       permeabilityContrastLog: 5,
    //     },
    //     relativePermeabilityFunctions: {
    //       funcName: 'Linear',
    //       srwRelperm: '',
    //       srnwRelperm: '',
    //       krewRelperm: '',
    //       krenwRelperm: '',
    //       wettingPhaseRelperm: '',
    //       nonWettingPhaseRelperm: '',
    //     },
    //     porosity: {
    //       value: '',
    //     },
    //     gravity: {
    //       customGravity: false,
    //       point: {
    //         x: '0',
    //         y: '0',
    //         z: '0',
    //       },
    //     },
    //     fluid: {
    //       name: 'Immiscible',
    //       numberOfPhases: 'TwoPhase',
    //       phase1Density: '',
    //       phase1Viscosity: '',
    //       phase1Compressibility: '',
    //       phase1HeatConductivity: '',
    //       phase1SpecificHeat: '',
    //       phase1DissolutionIntoPhase2: '0',
    //       phase2Density: '',
    //       phase2Viscosity: '',
    //       phase2Compressibility: '',
    //       phase2HeatConductivity: '',
    //       phase2SpecificHeat: '',
    //       phase2DissolutionIntoPhase1: '0',
    //     },
    //     rock: {
    //       name: 'Sandstone',
    //       density: '',
    //       compressibility: '',
    //       heatConductivity: '',
    //       specificHeat: '',
    //     },
    //     capillarity: {
    //       capillaritySwitch: false,
    //       capillarityType: 'Linear',
    //     },
    //     initialConditions: {
    //       initialPressure: '',
    //       InitialConditionType: 'Temperature',
    //       value: '',
    //       initialSaturation1: '',
    //     },
    //     wells: [],
    //     simulation: {
    //       simulationTime: {
    //         value: '',
    //         simulationTimeUnit: 'Days',
    //       },
    //       maximumTimesteps: '',
    //       reportsNumber: '',
    //       minTimestepSize: '',
    //       maxTimestepSize: '',
    //       outputFormat: 2,
    //       fullyImplicitMethod: {
    //         maximumNonlinearIterations: '',
    //         nonlinearResidualToleranceEquation1: '',
    //         nonlinearResidualToleranceEquation2: '',
    //         nonlinearSolutionToleranceUnknown1: '',
    //         nonlinearSolutionToleranceUnknown2: '',
    //         maximumSizeOfCfl: '',
    //       },
    //     },
    //   },
    // },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      // storage.setItem('user', user);
    },
    LOGOUT(state) {
      state.user = null;
      // storage.removeItem('user');
    },
    SET_CONFIG(state, config) {
      state.config.id = config.id;
      state.config.configs.projectId = config.id;
      state.config.name = config.name;
      state.config.configs.title = config.name;
    },
    SET_SAVE_CONFIG(state, config) {
      const section = Object.keys(config)[0];
      let name = Object.keys(config[section])[0];
      let value;
      if (typeof config[section][name] === "object") {
        const next = Object.keys(config[section][name])[0];
        value = config[section][name][next];
        state.config.configs[section][name][next] = value;
      } else {
        value = config[section][name];
        state.config.configs[section][name] = value;
      }
      console.log(state);
    },
    SET_WELLS(state, config) {
      state.config.configs.wells.push(config);
      console.log(state);
    },
    SET_SAVED_PROJECT_CONFIG(state, config) {
      state.config.configs = null;
      state.config.configs = config;
    },
    SET_NEW_CONFIG(state) {
      state.config = sampleConfig();
    },
  },
  actions: {},
});
