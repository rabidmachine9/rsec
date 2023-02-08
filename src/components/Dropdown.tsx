import { LabelRounded } from "@mui/icons-material"

interface DropdownProps {
  label: string,
  options: Map<string, number>,
  onChange: any
}

export const Dropdown: React.FC<DropdownProps> = ({ label, options, onChange }) => {
  return (
    <label htmlFor="ratio" > {label}
      <select className="moufa-dropdown" name="ratio" id="ratio" onChange={onChange}>
        {Array.from(options.entries()).map(([key, value]) => (
          <option key={key} value={value}>{key}</option>
        ))}
      </select>
    </label>
  );
};