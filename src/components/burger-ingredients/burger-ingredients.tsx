import { useState, useRef, useEffect, FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useInView } from 'react-intersection-observer';
import { TTabMode, TIngredient } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';

// Типы для состояния ингредиентов
interface IngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

export const BurgerIngredients: FC = () => {
  // Состояние для активной вкладки
  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');

  // Рефы для заголовков категорий
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  // Хуки для отслеживания видимости секций
  const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
  const [mainsRef, inViewMains] = useInView({ threshold: 0 });
  const [saucesRef, inViewSauces] = useInView({ threshold: 0 });

  const dispatch = useDispatch();

  // Получаем данные из Redux store
  const { ingredients, isLoading, error } = useSelector(
    (state) => state.rootReducer.ingredients
  ) as IngredientsState;

  // Обновляем активную вкладку при прокрутке
  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewMains) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewMains, inViewSauces]);

  // Обработчик клика по вкладке
  const handleTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);

    // Прокручиваем к соответствующей секции
    const refs = {
      bun: titleBunRef,
      main: titleMainRef,
      sauce: titleSaucesRef
    };

    refs[tab as keyof typeof refs]?.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  // Фильтруем ингредиенты по категориям
  const buns = ingredients.filter((item) => item.type === 'bun');
  const mains = ingredients.filter((item) => item.type === 'main');
  const sauces = ingredients.filter((item) => item.type === 'sauce');

  // Отображаем состояние загрузки или ошибки
  if (isLoading) {
    return <p>Загрузка ингредиентов...</p>;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={handleTabClick}
    />
  );
};
