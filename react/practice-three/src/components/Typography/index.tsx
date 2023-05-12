// Styles
import './index.css';

interface TypographyProps {
  tagName?: 'h1' | 'h2' | 'h3' | 'p';
  text: string;
  size?: 'xs' | 's' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'quaternary';
  weight?: 'regular' | 'bold' | 'semiBold';
}

const Typography = ({
  tagName = 'p',
  text,
  size = 'md',
  color = 'primary',
  weight,
}: TypographyProps) => {
  const TagName = tagName;

  return (
    <TagName
      className={`typography typography-color-${color} typography-size-${size} ${
        weight ? `typography-weight-${weight}` : ''
      }`}
    >
      {text}
    </TagName>
  );
};

export { Typography };
export type { TypographyProps };
