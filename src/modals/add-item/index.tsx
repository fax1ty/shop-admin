import { ChangeEvent, ChangeEventHandler, FC, useEffect } from "react";
import Dropzone from "react-dropzone";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import {
  ArrowsClockwise,
  CurrencyRub,
  FileImage,
  ProhibitInset,
  WarningCircle,
  X,
} from "phosphor-react";
import { toBase64 } from "utils";
import { Button } from "components/button";
import { toast } from "react-toastify";
import { Popup } from "components/popup";
import { MercoinInput } from "components/mercoin-input";

import classes from "./styles.module.scss";
import { ReactComponent as OzonLogo } from "./ozon.svg";

interface Props {
  onClose: () => void;
}

interface IForm {
  title: string;
  descirption: string;
  images: Array<string>;
  prices: {
    mercoin: number;
  };
  ozon: string;
}

export const AddItemModal: FC<Props> = ({ onClose }) => {
  const { register, handleSubmit, watch, setValue } = useForm<IForm>({
    defaultValues: {
      title: "Новый товар",
      descirption:
        "Вы можете менять любое поле. Заголовок, обложку, цену, даже это описание. Просто нажмите на любой элемент, а затем перейдите к следующему. После нажатия на кнопку “Добавить”, все изменения будут сохранены, а товар добавлен в базу",
      images: [],
      prices: {
        mercoin: 0,
      },
    },
  });
  const formData = watch();

  const onSubmit = console.log;

  useEffect(() => console.log(formData), [formData]);

  return (
    <Popup
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      buttons={[
        <Button
          key="cancel-button"
          icon={ProhibitInset}
          size="big"
          onClick={onClose}
        >
          Отмена
        </Button>,
        <Button
          key="add-button"
          icon={ProhibitInset}
          size="big"
          priority="lead"
          onClick={() => {
            onClose();
            toast(
              <div className={classes.content}>
                <WarningCircle className={classes.icon} weight="fill" />
                <p>Товар был успешно добавлен</p>
              </div>,
              {
                className: classes.toast,
                closeButton: false,
              }
            );
          }}
        >
          Добавить новый товар
        </Button>,
      ]}
    >
      <>
        <input
          {...register("title")}
          className={classes.heading}
          placeholder="Название"
        />
        <TextareaAutosize
          {...register("descirption")}
          className={classes.description}
          placeholder="Описание"
        />
        <div className={classes.images}>
          {new Array(formData.images.length + 1).fill(0).map((_, i) => (
            <Dropzone
              key={`image-uploader-${i}`}
              onDropAccepted={async (acceptedFiles) => {
                if (acceptedFiles[0])
                  setValue(`images.${i}`, await toBase64(acceptedFiles[0]));
              }}
              accept={["image/png", "image/jpeg"]}
              multiple={false}
            >
              {({ getRootProps, getInputProps }) =>
                formData.images[i] ? (
                  <div className={classes["image-container"]}>
                    <div {...getRootProps()} className={classes.image}>
                      <input {...getInputProps()} />
                      <img
                        src={formData.images[i].toString()}
                        alt=""
                        className={classes.accepted}
                      />
                      <div className={classes.change}>
                        <ArrowsClockwise
                          className={classes.icon}
                          weight="bold"
                        />
                      </div>
                    </div>
                    <div
                      className={classes.delete}
                      onClick={() => {
                        const copy = formData.images;
                        copy.splice(i, 1);
                        setValue("images", copy);
                      }}
                    >
                      <X weight="bold" />
                    </div>
                  </div>
                ) : (
                  <div {...getRootProps()} className={classes.image}>
                    <input {...getInputProps()} />
                    <FileImage className={classes.icon} />
                  </div>
                )
              }
            </Dropzone>
          ))}
        </div>
        <div className={classes.prices}>
          {(() => {
            const props = register("prices.mercoin", {
              valueAsNumber: true,
              onChange: (e) => {
                if (!e.currentTarget.value) setValue("prices.mercoin", 0);
              },
            });
            return <MercoinInput inputProps={props} />;
          })()}
          <p className={classes.delimiter}>/</p>
          <div className={classes.ruble}>
            <p className={classes.value}>{formData.prices.mercoin}</p>
            <CurrencyRub className={classes.icon} weight="bold" />
          </div>
        </div>
        <div className={classes.ozon}>
          <div className={classes.link}>
            <OzonLogo className={classes.logo} />
            <p className={classes.separator}>/</p>
            <input
              type="text"
              placeholder="product/very-cool-product"
              {...register("ozon", {
                onChange: (e: ChangeEvent<HTMLInputElement>) => {
                  const input = e.target.value;

                  if (input.includes("ozon.ru")) {
                    const asUrl = new URL(input);
                    setValue(
                      "ozon",
                      "product/" +
                        asUrl.pathname.split("product")[1].replaceAll("/", "")
                    );
                  }
                },
              })}
            />
          </div>
          <p className={classes.description}>
            Вы можете вставить ссылку как обычно, она будет автоматически
            обработана
          </p>
        </div>
      </>
    </Popup>
  );
};
