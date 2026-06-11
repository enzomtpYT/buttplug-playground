import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { ButtplugClientDevice, DeviceOutputCommand, OutputType } from "buttplug";
const vueSlider = require("vue-slider-component");

@Component({
  components: {
    vueSlider,
  },
})
export default class OscillationComponent extends Vue {
  @Prop()
  private device!: ButtplugClientDevice;

  @Prop({ default: -1 })
  private oscillatorIndex!: number;

  private sliderValue: number = 0;
  private isDragging: boolean = false;

  private OnDragStart() {
    this.isDragging = true;
    this.$emit("dragstart");
  }

  private async FireOscillateCommand() {
    // In buttplug v5, use runOutput with DeviceOutputCommand
    try {
      const cmd = DeviceOutputCommand.createPercent(OutputType.Oscillate, this.sliderValue / 100.0);
      await this.device.runOutput(cmd);
    } catch (e) {
      console.log("Error sending oscillation command", e);
    }
  }

  private OnDragEnd() {
    this.isDragging = false;
    this.$emit("dragstop");
    this.FireOscillateCommand();
  }

  private async OnValueChanged(endValue: number) {
    try {
      await this.FireOscillateCommand();
    } catch (e) {
      console.log("Got exception back!");
      console.log(e);
    }
  }
}