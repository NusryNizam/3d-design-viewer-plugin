interface DragInputOptions {
  defaultValue?: number;
  onChange?: (value: number) => void;
  maxValue?: number;
  minValue?: number;
}

export class DragInput {
  private input: HTMLInputElement;
  private defaultValue: number;
  private value: number;
  private isDragging: boolean;
  private startX: number;
  private onChange?: (value: number) => void;
  private maxValue?: number;
  private minValue?: number;

  constructor(inputElement: HTMLInputElement, options: DragInputOptions = {}) {
    this.input = inputElement;
    this.defaultValue =
      options.defaultValue ?? (parseFloat(this.input.value) || 0);
    this.value = this.defaultValue;
    this.isDragging = false;
    this.startX = 0;
    this.onChange = options.onChange;
    this.maxValue = options.maxValue;
    this.minValue = options.minValue;

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.input.addEventListener("mousedown", this.handleMouseDown.bind(this));
    document.addEventListener("mousemove", this.handleMouseMove.bind(this));
    document.addEventListener("mouseup", this.handleMouseUp.bind(this));
    this.input.addEventListener("change", this.handleInputChange.bind(this));
  }

  private handleMouseDown(e: MouseEvent): void {
    this.isDragging = true;
    this.startX = e.clientX;
    document.body.style.cursor = "ew-resize";
  }

  private handleMouseMove(e: MouseEvent): void {
    if (!this.isDragging) return;

    const deltaX = e.clientX - this.startX;
    const increment = e.shiftKey ? 10 : 1;

    const change = Math.floor(deltaX / 2) * increment;
    if (change !== 0) {
      const newValue = parseFloat(this.input.value) + change;

      // Check if the new value exceeds the maxValue
      if (this.maxValue !== undefined && newValue > this.maxValue) {
        this.value = this.maxValue; // Cap the value at maxValue
      } else if (this.minValue !== undefined && newValue < this.minValue) {
        this.value = this.minValue;
      } else {
        this.value = newValue;
      }

      this.input.value = this.value.toString();
      this.startX = e.clientX;

      if (this.onChange) {
        this.onChange(this.value);
      }
    }
  }

  private handleMouseUp(): void {
    this.isDragging = false;
    document.body.style.cursor = "default";
  }

  private handleInputChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.value = parseFloat(target.value);

    if (this.onChange) {
      this.onChange(this.value);
    }
  }

  public reset(): void {
    this.value = this.defaultValue;
    this.input.value = this.defaultValue.toString();

    if (this.onChange) {
      this.onChange(this.value);
    }
  }

  public getValue(): number {
    return this.value;
  }

  public setValue(value: number): void {
    this.value = value;
    this.input.value = value.toString();

    if (this.onChange) {
      this.onChange(this.value);
    }
  }
}
