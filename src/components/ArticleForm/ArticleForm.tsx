import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';

const ArticleForm: React.FC<any> = ({
  onSubmit,
  setTags,
  header,
  article: { title = '', description = '', body = '', tags = [] } = {
    title: '',
    description: '',
    body: '',
    tags: [],
  },
}) => {
  const { handleSubmit, register, errors } = useForm();
  const [newTag, setNewTag] = useState<string>('');
  const [addedTag, setAddedTag] = useState<boolean>(true);

  const handleRemoveTag = (evt: React.MouseEvent<HTMLInputElement>) => {
    const id = Number(evt.currentTarget.dataset.id);
    const newTags: string[] = [...tags];
    newTags.splice(id, 1);
    setTags(newTags);
  };

  const handleChangeTags = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(evt.currentTarget.dataset.id);
    const newTags: string[] = [...tags];
    newTags[id] = evt.currentTarget.value;
    setTags(newTags);
  };

  const handleChangeNewTag = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(evt.currentTarget.value);
  };

  const handleToggleAddedTag = () => {
    setAddedTag(false);
  };

  const handleAddTag = () => {
    const newTags: string[] = [...tags];
    newTags.push(newTag);
    setTags(newTags);
    setNewTag('');
  };

  return (
    <form
      action=""
      onSubmit={handleSubmit(onSubmit)}
      className="form article-form"
    >
      <h3 className="form__title">{header}</h3>
      <label htmlFor="title" className="form__label">
        <span className="form__label-text">Title</span>
        <input
          type="text"
          ref={register({
            required: true,
          })}
          defaultValue={title}
          name="title"
          id="title"
          className="form__input"
          placeholder="Title"
        />
        {errors.title && <span className="form__input-error">Enter title</span>}
      </label>
      <label htmlFor="short-description" className="form__label">
        <span className="form__label-text">Short description</span>
        <input
          type="text"
          ref={register({
            required: true,
          })}
          defaultValue={description}
          name="description"
          id="short-description"
          className="form__input"
          placeholder="Short description"
        />
        {errors['Short description'] && (
          <span className="form__input-error">Enter Short description</span>
        )}
      </label>
      <label htmlFor="text" className="form__label">
        <span className="form__label-text">Text</span>
        <textarea
          name="body"
          defaultValue={body}
          ref={register({
            required: true,
          })}
          id="text"
          className="form__textarea"
          placeholder="Text"
        />
        {errors.text && (
          <span className="form__input-error">Enter text article</span>
        )}
      </label>
      <label htmlFor="" className="form__label">
        <span className="form__label-text">Tags</span>
        <div className="tags-container">
          {tags.map((tag: string, index: number) => (
            <div className="tag-container" key={nanoid()}>
              <input
                type="text"
                value={tag}
                className="tag-container__input"
                data-id={index}
                onChange={handleChangeTags}
              />
              <input
                type="button"
                value="Delete"
                className="tag-container__button-remove"
                data-id={index}
                onClick={handleRemoveTag}
              />
            </div>
          ))}
        </div>
        {addedTag && (
          <div className="tags-form">
            <input
              type="text"
              value={newTag}
              className="tag-container__input"
              onChange={handleChangeNewTag}
            />
            <input
              type="button"
              value="Delete"
              className="tag-container__button-remove"
              onClick={handleToggleAddedTag}
            />
            <input
              type="button"
              value="Add tag"
              className="tag-container__button-add"
              onClick={handleAddTag}
            />
          </div>
        )}
      </label>
      <input
        type="submit"
        className="form__submit article-form__input-submit"
        value="Send"
      />
    </form>
  );
};

export default ArticleForm;
