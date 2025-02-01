import React from "react";
import { SurveyModel } from "../../services/SurveyModel";

type IProps = {
  model: SurveyModel;
};

const FormRenderer: React.FC<IProps> = ({ model }) => {
  const handleValueChange = (questionName: string, value: any) => {
    model.setValue(questionName, value);
  };

  const handleComplete = () => {
    model.complete();
  };

  return (
    <div>
      <h1>{model.title}</h1>
      {model.elements.map((element) => (
        <div key={element.name}>
          <label>{element.title}</label>
          {element.type === "text" && (
            <input
              type="text"
              onChange={(e) => handleValueChange(element.name, e.target.value)}
            />
          )}
          {element.type === "radio" && (
            <div>
              {element.choices?.map((choice) => (
                <label key={choice.value}>
                  <input
                    type="radio"
                    name={element.name}
                    value={choice.value}
                    onChange={() =>
                      handleValueChange(element.name, choice.value)
                    }
                  />
                  {choice.text}
                </label>
              ))}
            </div>
          )}
          {element.type === "checkbox" && (
            <div>
              {element.choices?.map((choice) => (
                <label key={choice.value}>
                  <input
                    type="checkbox"
                    name={element.name}
                    value={choice.value}
                    onChange={() => {
                      const values = model.getValue(element.name) || [];
                      if (values.includes(choice.value)) {
                        values.splice(values.indexOf(choice.value), 1);
                      } else {
                        values.push(choice.value);
                      }

                      handleValueChange(element.name, values);
                    }}
                  />
                  {choice.text}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
      <button onClick={handleComplete}>{model.data?.completeText}</button>
    </div>
  );
};

export default FormRenderer;
