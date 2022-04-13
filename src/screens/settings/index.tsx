import { Switch } from "components/switch";
import { Controller, useForm } from "react-hook-form";

import classes from "./styles.module.scss";

interface IForm {
  isOn: boolean;
  canAddItems: boolean;
  hotWater: boolean;
}

export const SettingsScreen = () => {
  const { watch, control } = useForm<IForm>({
    defaultValues: { isOn: true, canAddItems: true, hotWater: false },
  });
  const formData = watch();

  return (
    <>
      <header>
        <h1>Настройки</h1>
      </header>

      <form className={classes.list}>
        <div className={classes.option}>
          <p>Магазин работает</p>
          <Controller
            name="isOn"
            control={control}
            render={({ field }) => (
              <Switch
                onChange={field.onChange}
                onBlurCapture={field.onBlur}
                checked={field.value}
              />
            )}
          />
        </div>

        <div className={classes.option}>
          <p>Товары добавляются</p>
          <Controller
            name="canAddItems"
            control={control}
            render={({ field }) => (
              <Switch
                onChange={field.onChange}
                onBlurCapture={field.onBlur}
                checked={field.value}
              />
            )}
          />
        </div>

        <div className={classes.option}>
          <p>Горячая вода</p>
          <Controller
            name="hotWater"
            control={control}
            render={({ field }) => (
              <Switch
                onChange={field.onChange}
                onBlurCapture={field.onBlur}
                checked={field.value}
              />
            )}
          />
        </div>
      </form>
    </>
  );
};
