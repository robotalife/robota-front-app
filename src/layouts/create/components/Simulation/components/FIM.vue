<script>
import BaseInput from '@/components/input/BaseInput.vue';
export default {
  name: 'FIM',
  components: {
    BaseInput,
  },
  data() {
    return {
      maxNonLiner: this.$store.state?.config.configs.simulation
        .fullyImplicitMethod.maximumNonlinearIterations,
      nonLiner1: this.$store.state?.config.configs.simulation
        .fullyImplicitMethod.nonlinearResidualToleranceEquation1,
      nonLiner2: this.$store.state?.config.configs.simulation
        .fullyImplicitMethod.nonlinearResidualToleranceEquation2,
      nonLinerSolution1: this.$store.state?.config.configs.simulation
        .fullyImplicitMethod.nonlinearSolutionToleranceUnknown1,
      nonLinerSolution2: this.$store.state?.config.configs.simulation
        .fullyImplicitMethod.nonlinearSolutionToleranceUnknown2,
      maxCfl: this.$store.state?.config.configs.simulation.fullyImplicitMethod
        .maximumSizeOfCfl,
    };
  },
};
</script>

<template>
  <div>
    <BaseInput
      label="Maximum number of nonlinear iterations"
      name="maximumNonlinearIterations"
      section="simulation"
      next="fullyImplicitMethod"
      :default="maxNonLiner"
    />
    <div class="d-flex m-t-4">
      <BaseInput
        label="Nonlinear Residual Tolerance"
        name="nonlinearResidualToleranceEquation1"
        unit="Equation 1"
        section="simulation"
        next="fullyImplicitMethod"
        :default="nonLiner1"
      />
      <BaseInput
        name="nonlinearResidualToleranceEquation2"
        unit="Equation 2"
        class="m-l-2 m-t-3"
        section="simulation"
        next="fullyImplicitMethod"
        :default="nonLiner2"
      />
    </div>
    <div class="d-flex m-y-4">
      <BaseInput
        label="Nonlinear Solution Tolerance"
        name="nonlinearSolutionToleranceUnknown1"
        unit="Unknown 1"
        section="simulation"
        next="fullyImplicitMethod"
        :default="nonLinerSolution1"
      />
      <BaseInput
        name="nonlinearSolutionToleranceUnknown2"
        unit="Unknown 2"
        class="m-l-2 m-t-3"
        section="simulation"
        next="fullyImplicitMethod"
        :default="nonLinerSolution2"
      />
    </div>
    <BaseInput
      label="Maximum size of CFL"
      name="maximumSizeOfCfl"
      section="simulation"
      next="fullyImplicitMethod"
      :default="maxCfl"
    />
  </div>
</template>
