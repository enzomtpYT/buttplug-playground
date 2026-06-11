import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { ButtplugClientDevice, DeviceOutputCommand, OutputType } from "buttplug";
const vueSlider = require("vue-slider-component");

@Component({
  components: {
    vueSlider,
  },
})
export default class RotationComponent extends Vue {
  @Prop()
  private device!: ButtplugClientDevice;

  @Prop({ default: -1 })
  private rotatorIndex!: number;

  private sliderValue: number = 0;
  private isDragging: boolean = false;

  private OnDragStart() {
    this.isDragging = true;
    this.$emit("dragstart");
  }

  private FireRotateCommand() {
    // In buttplug v5, use runOutput with DeviceOutputCommand.
    // The slider goes -100 to +100: magnitude is speed, sign is direction.
    // v5 rotate uses a single scalar 0..1 where the direction is implicit in the feature.
    const speed = Math.abs(this.sliderValue) / 100.0;
    const cmd = DeviceOutputCommand.createPercent(OutputType.Rotate, speed);
    this.device.runOutput(cmd).catch((e: any) => console.log("Error sending rotation command", e));
  }

  private OnDragEnd() {
    this.isDragging = false;
    this.$emit("dragstop");
    this.FireRotateCommand();
  }

  private OnValueChanged(endValue: number) {
    if (this.isDragging) {
      return;
    }
    this.FireRotateCommand();
  }
}
