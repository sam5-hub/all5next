// import { CheckboxFieldFormElement } from "./fields/CheckboxField";
// import { DateFieldFormElement } from "./fields/DateField";
// import { NumberFieldFormElement } from "./fields/NumberField";
// import { ParagprahFieldFormElement } from "./fields/ParagraphField";
// import { SelectFieldFormElement } from "./fields/SelectField";
// import { SeparatorFieldFormElement } from "./fields/SeparatorField";
// import { SpacerFieldFormElement } from "./fields/SpacerField";
// import { SubTitleFieldFormElement } from "./fields/SubTitleField";
// import { TextAreaFormElement } from "./fields/TextAreaField";
import { TextFieldFormElement } from "@/components/fileds/TextField";
import { TitleFieldFormElement } from "@/components/fileds/TitleField";
import { SubTitleFieldFormElement } from "../fileds/SubTitleField";


import { FacebookFieldFormElement } from "@/components/fileds/FacebookField";
import { InstagramFieldFormElement } from "@/components/fileds/InstagramField";
import { TwitterFieldFormElement } from "@/components/fileds/TwitterField";
import { TiktokFieldFormElement } from "@/components/fileds/TiktokField";
import { GithubFieldFormElement } from "@/components/fileds/GithubField";
import { YoutubeFieldFormElement } from "@/components/fileds/YoutubeField";
import { DateFieldFormElement } from "../fileds/DateField";

export type ElementsType =
  | "FacebookField"
  | "InstagramField"
  | "TwitterField"
  | "TiktokField"
  | "GithubField"
  | "YoutubeField"

  | "TextField"
  | "TitleField"
  | "SubTitleField"
  // | "ParagraphField"
  // | "SeparatorField"
  // | "SpacerField"
  // | "NumberField"
  // | "TextAreaField"
  | "DateField"
  // | "SelectField"
  // | "CheckboxField";

export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };

  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};
export const FormElements: FormElementsType = {
  FacebookField: FacebookFieldFormElement,
  InstagramField: InstagramFieldFormElement,
  TwitterField: TwitterFieldFormElement,
  TiktokField: TiktokFieldFormElement,
  GithubField: GithubFieldFormElement,
  YoutubeField: YoutubeFieldFormElement,

  TextField: TextFieldFormElement,
  TitleField: TitleFieldFormElement,
  SubTitleField: SubTitleFieldFormElement,
  // ParagraphField: ParagprahFieldFormElement,
  // SeparatorField: SeparatorFieldFormElement,
  // SpacerField: SpacerFieldFormElement,
  // NumberField: NumberFieldFormElement,
  // TextAreaField: TextAreaFormElement,
  DateField: DateFieldFormElement,
  // SelectField: SelectFieldFormElement,
  // CheckboxField: CheckboxFieldFormElement,
};
