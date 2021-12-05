import { useMemo, useEffect } from "react";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebouncedFunction = <T extends (...args: any[]) => void>(
  callback: T,
  time = 20
): ((...args: Parameters<T>) => void) => {
  const sliderChangeSubject$ = useMemo(() => new Subject<Parameters<T>>(), []);

  useEffect(() => {
    const subscription = sliderChangeSubject$
      .pipe(debounceTime(time))
      .subscribe((args) => callback(...args));

    return () => subscription?.unsubscribe();
  }, [sliderChangeSubject$, time, callback]);

  return (...args: Parameters<T>) => sliderChangeSubject$.next(args);
};
