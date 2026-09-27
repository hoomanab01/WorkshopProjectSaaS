import {
  Button,
  BUTTON_SIZES,
  BUTTON_STATES,
  BUTTON_VARIANTS,
} from "@/components/Button";
import { CircleIcon } from "@/components/icons/CircleIcon";
import styles from "./FigmaButtonMatrix.module.css";

const LAYOUTS = ["icon and label", "icon only"] as const;

// All 168 versions of the Figma button set, laid out like the Figma frame.
// The "default" column is live: hover, press and tab to it.
export function FigmaButtonMatrix() {
  return (
    <div>
      {BUTTON_VARIANTS.map((variant) => (
        <div key={variant} className={styles.variant}>
          <h4 className={styles.variantTitle}>{variant}</h4>
          <div className={styles.scroller}>
            <table className={styles.grid}>
              <thead>
                <tr>
                  <th scope="col" className={styles.corner}>
                    size · layout
                  </th>
                  {BUTTON_STATES.map((state) => (
                    <th key={state} scope="col">
                      {state}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LAYOUTS.flatMap((layout) =>
                  BUTTON_SIZES.map((size) => (
                    <tr key={`${layout}-${size}`}>
                      <th scope="row">
                        {size} · {layout}
                      </th>
                      {BUTTON_STATES.map((state) => {
                        const shared = {
                          variant,
                          size,
                          state: state === "default" ? undefined : state,
                        };
                        return (
                          <td key={state}>
                            {layout === "icon only" ? (
                              <Button
                                {...shared}
                                layout="icon only"
                                icon={<CircleIcon />}
                                aria-label={`${variant} ${size} ${state}`}
                              />
                            ) : (
                              <Button
                                {...shared}
                                label="Label"
                                leftIcon={<CircleIcon />}
                                rightIcon={<CircleIcon />}
                              />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
