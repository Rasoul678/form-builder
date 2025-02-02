import { FormElement, FormJSON } from "../types";

export class SurveyModel {
  public data: FormJSON | null = null;
  public onValueChanged: Event<SurveyModel, any> = new Event<
    SurveyModel,
    any
  >();
  public onComplete: Event<SurveyModel, any> = new Event<SurveyModel, any>();
  public isCompleted: boolean = false;
  public elements: FormElement[] = [];

  constructor(json: FormJSON) {
    this.fromJSON(json);
  }

  public fromJSON(json: FormJSON): void {
    this.data = json;

    if (json.elements && Array.isArray(json.elements)) {
      this.elements = json.elements;
    } else {
      this.elements = [];
    }
  }
  public setValue(name: string, value: any): void {
    if (this.data) {
      const element = this.data.elements.find(
        (element) => element.name === name
      );

      if (element) {
        element.value = value;
      }

      this.onValueChanged.fire(this, { name, value });
    }
  }

  public getValue(name: string): any {
    return this.data?.elements.find((element) => element.name === name)?.value;
  }

  public get title(): string {
    return this.data?.title || "";
  }

  public complete(): void {
    this.isCompleted = true;
    this.onComplete.fire(this, {});
    ``;
  }
}

/**
 * A generic event class that allows for adding, removing, and firing event handlers.
 *
 * @template T The type of the subject or sender of the event.
 * @template U The type of the event arguments.
 */
class Event<T, U> {
  private handlers: Array<(sender: T, args: U) => void> = [];

  // Add an event listener
  public add(handler: (sender: T, args: U) => void): void {
    this.handlers.push(handler);
  }

  // Remove an event listener
  public remove(handler: (sender: T, args: U) => void): void {
    this.handlers = this.handlers.filter((h) => h !== handler);
  }

  // Fire the event
  public fire(sender: T, args: U): void {
    this.handlers.forEach((handler) => handler(sender, args));
  }
}
