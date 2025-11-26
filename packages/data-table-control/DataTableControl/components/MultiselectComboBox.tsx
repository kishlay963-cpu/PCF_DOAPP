import * as React from "react";

export interface MultiselectComboBoxProps {
  id: string;
  ariaLabel: string;
  values: string[];
  options: string[];
  placeholder?: string;
  disabled?: boolean;
  onChange: (next: string[]) => void;
}

export const MultiselectComboBox: React.FC<MultiselectComboBoxProps> = ({
  id,
  ariaLabel,
  values,
  options,
  placeholder,
  disabled,
  onChange,
}) => {
  const [query, setQuery] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const normalisedValues = React.useMemo(() => values.map(value => value.trim()).filter(Boolean), [values]);

  const filteredOptions = React.useMemo(() => {
    const search = query.trim().toLowerCase();
    return options
      .map(option => option.trim())
      .filter(Boolean)
      .filter(option => !normalisedValues.includes(option))
      .filter(option => option.toLowerCase().includes(search));
  }, [options, normalisedValues, query]);

  const commitValue = React.useCallback(
    (value: string) => {
      const trimmed = value.trim();
      if (!trimmed || normalisedValues.includes(trimmed)) {
        setQuery("");
        return;
      }
      onChange([...normalisedValues, trimmed]);
      setQuery("");
    },
    [normalisedValues, onChange],
  );

  const removeValue = React.useCallback(
    (value: string) => {
      const trimmed = value.trim();
      onChange(normalisedValues.filter(item => item !== trimmed));
    },
    [normalisedValues, onChange],
  );

  const closeList = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleFocus = React.useCallback(() => {
    if (!disabled) {
      setIsOpen(true);
    }
  }, [disabled]);

  const handleBlur = React.useCallback(() => {
    window.setTimeout(() => {
      setIsOpen(false);
    }, 120);
  }, []);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const candidate = filteredOptions[0] ?? query;
        commitValue(candidate);
        closeList();
      } else if (event.key === "Escape") {
        event.preventDefault();
        closeList();
      } else if (event.key === "ArrowDown" && filteredOptions.length > 0) {
        setIsOpen(true);
      } else if (event.key === "Backspace" && !query && normalisedValues.length > 0) {
        event.preventDefault();
        removeValue(normalisedValues[normalisedValues.length - 1]);
      }
    },
    [closeList, commitValue, filteredOptions, normalisedValues, query, removeValue],
  );

  const handleOptionMouseDown = React.useCallback(
    (option: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (disabled) {
        return;
      }
      commitValue(option);
      closeList();
      inputRef.current?.focus();
    },
    [closeList, commitValue, disabled],
  );

  const placeholderText = placeholder ?? "Search";
  const listboxId = `${id}-list`;

  return (
    <div
      className="dt-combobox"
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={isOpen && filteredOptions.length > 0}
      aria-owns={listboxId}
      data-disabled={disabled ? "true" : undefined}
    >
      <div className="dt-combobox-control" onClick={() => inputRef.current?.focus()}>
        {normalisedValues.map(value => (
          <span className="dt-combobox-chip" key={value}>
            {value}
            <button
              type="button"
              className="dt-combobox-chip-remove"
              onClick={() => removeValue(value)}
              aria-label={`Remove ${value}`}
              disabled={disabled}
            >
              ×
            </button>
          </span>
        ))}
        <input
          id={id}
          ref={inputRef}
          className="dt-combobox-input"
          type="text"
          aria-label={ariaLabel}
          value={query}
          placeholder={normalisedValues.length === 0 ? placeholderText : ""}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={event => {
            setQuery(event.target.value);
            if (!disabled) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          autoComplete="off"
        />
      </div>
      {isOpen && filteredOptions.length > 0 ? (
        <ul className="dt-combobox-list" id={listboxId} role="listbox">
          {filteredOptions.map(option => (
            <li key={option}>
              <button
                type="button"
                className="dt-combobox-option"
                onMouseDown={handleOptionMouseDown(option)}
                disabled={disabled}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
