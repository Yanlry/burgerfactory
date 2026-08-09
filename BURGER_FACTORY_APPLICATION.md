# Burger Factory --- Spécification fonctionnelle & catalogue produits

> Document de référence destiné à Claude avant le développement de
> l'application / du site Burger Factory. Objectif : centraliser le
> fonctionnement attendu, la structure du catalogue, la numérotation des
> produits et les informations à associer aux visuels.

------------------------------------------------------------------------

## 1. Objectif du projet

Créer une application / un site de commande pour **Burger Factory** à
partir du menu papier existant.

Le catalogue doit être structuré proprement afin que chaque produit
puisse être affiché avec :

-   un identifiant numérique stable ;
-   un nom ;
-   une catégorie ;
-   une description / composition ;
-   un prix seul ;
-   un prix menu lorsqu'il existe ;
-   une image dédiée ;
-   les éventuelles options.

Les images produits sont créées séparément. Elles doivent pouvoir être
reliées facilement aux références de ce document.

------------------------------------------------------------------------

## 2. Règles importantes pour le développement

### Source de vérité

Ce fichier est la **source de vérité fonctionnelle du catalogue**.

Lorsqu'un écran, une carte produit, une fiche produit ou un menu doit
être codé, rechercher d'abord le numéro ou le nom du produit dans ce
document.

Ne pas inventer une composition ou un prix absent de ce fichier.

### Numérotation

Les références vont de **1 à 39**.

La numérotation doit rester stable dans le code afin de faciliter la
correspondance avec les images.

Exemple recommandé :

``` ts
type ProductId = number;

interface Product {
  id: ProductId;
  name: string;
  category: ProductCategory;
  description: string;
  price: number | null;
  menuPrice?: number | null;
  image?: string;
}
```

### Images

Convention recommandée :

``` text
assets/products/01-triple-beef.png
assets/products/02-mega-factory.png
...
assets/products/39-menu-enfant.png
```

Les images doivent être utilisées comme visuels de produit et non comme
source de texte à parser au runtime.

### Direction artistique des visuels produits

Les visuels générés pour le catalogue suivent globalement cette
direction :

-   fond noir ;
-   photographie food réaliste / premium ;
-   produit centré ;
-   aucun prix intégré dans l'image ;
-   aucun texte ajouté dans l'image sauf demande spécifique ;
-   pas de décor inutile ;
-   cohérence visuelle entre les références.

------------------------------------------------------------------------

## 3. Catalogue complet

  --------------------------------------------------------------------------------------
             ID Produit     Catégorie   Description /            Prix seul     Prix menu
                                        composition                        
  ------------- ----------- ----------- -------------------- ------------- -------------
              1 Triple Beef Burger      3 steaks 80 g,             11,00 €       13,00 €
                                        cheddar, iceberg,                  
                                        oignons rouges,                    
                                        sauce                              

              2 Méga        Burger      2 steaks 80 g,              9,50 €       11,50 €
                Factory                 cheddar, iceberg,                  
                                        oignons rouges,                    
                                        sauce BBQ / mayo                   

              3 Giant       Burger      Steak 150 g façon           8,50 €       11,00 €
                Factory                 bouchère, bacon,                   
                                        cheddar, iceberg,                  
                                        oignons rouges,                    
                                        sauce Giant                        

              4 Bacon       Burger      Steak 80 g, cheddar,        6,50 €        8,50 €
                                        salade, oignons                    
                                        rouges, bacon, sauce               

              5 Chèvre Miel Burger      Steak 80 g, chèvre,         6,50 €        8,50 €
                                        miel, salade,                      
                                        oignons rouges,                    
                                        sauce                              

              6 Raclette    Burger      Steak 80 g,                 6,50 €        8,50 €
                                        raclette, salade,                  
                                        oignons rouges,                    
                                        sauce                              

              7 Biggy       Burger      2 steaks 45 g,              5,50 €        8,50 €
                                        cheddar, salade,                   
                                        oignons, cornichons,               
                                        sauce Biggy +                      
                                        tranche de pain                    
                                        intermédiaire entre                
                                        les steaks                         

              8 Chicken     Burger      2 tenders, cheddar,         5,50 €        8,50 €
                                        salade, oignons,                   
                                        tomates, sauce                     
                                        chicken                            

              9 Country     Burger      2 tenders, galette          6,50 €        9,50 €
                Chicken                 de pomme de terre,                 
                                        cheddar, salade,                   
                                        oignons, tomates,                  
                                        sauce chicken                      

             10 Chicken     Burger      Tenders + steak 80          6,50 €        9,50 €
                Beef                    g, cheddar, salade,                
                                        oignons, tomates,                  
                                        sauce Giant                        

             11 Wrap        Wrap        2 tenders, cheddar,         6,50 €        8,50 €
                Chicken                 salade, oignons,                   
                                        tomates, sauce                     
                                        chicken                            

             12 Wrap        Wrap        Tenders + steak,            7,50 €        9,50 €
                Chicken                 cheddar, salade,                   
                Beef                    oignons rouges,                    
                                        tomates, sauce                     
                                        mayo/ketchup                       

             13 Wrap        Wrap        2 tenders, galette          7,00 €        9,50 €
                Country                 de pomme de terre,                 
                                        cheddar, salade,                   
                                        oignons, tomates,                  
                                        sauce Giant                        

             14 M1 --       Menu        2 Cheese Burgers +             ---        8,50 €
                Cheese                  frites + boisson                   
                Burger ×2                                                  

             15 M2 --       Menu        1 Cheese Burger + 1            ---        9,00 €
                Cheese                  Double Cheese +                    
                Burger +                frites + boisson                   
                Double                                                     
                Cheese                                                     

             16 M3 --       Menu        1 Chicken Burger + 1           ---        9,00 €
                Chicken                 Cheese Burger +                    
                Burger +                frites + boisson                   
                Cheese                                                     
                Burger                                                     

             17 M4 --       Menu        1 Chicken Beef + 1             ---        9,50 €
                Chicken                 Cheese Burger +                    
                Beef +                  frites + boisson                   
                Cheese                                                     

             18 M5 --       Menu        1 Country Chicken +            ---       12,50 €
                Country +               4 tenders + frites +               
                Tenders ×4              boisson                            

             19 M6 -- Biggy Menu        2 Biggy + frites +             ---       12,50 €
                ×2                      boisson                            

             20 Chicken     Chicken /   1 kg de wings.             17,00 €       26,00 €
                Bucket --   Bucket      Version menu : 1                   
                Wings                   bouteille + 4                      
                                        petites frites                     

             21 Chicken     Chicken /   1 kg de tenders.           17,00 €       26,00 €
                Bucket --   Bucket      Version menu : 1                   
                Tenders                 bouteille + 4                      
                                        petites frites                     

             22 5 Tenders   Chicken /   5 tenders de poulet         6,00 €       +3,00 €
                            Snack       panés                              

             23 5 Wings     Chicken /   5 wings de poulet           6,00 €       +3,00 €
                            Snack       panées                             

             24 8 Nuggets   Chicken /   8 nuggets de poulet         6,00 €       +3,00 €
                            Snack                                          

             25 8 Mozza     Snack       8 bâtonnets de              6,00 €       +3,00 €
                Sticks                  mozzarella panés                   

             26 Cheese      Petit       Petit burger avec           2,90 €       +3,00 €
                            burger      steak et cheddar                   

             27 Double      Petit       Petit burger avec 2         3,90 €       +3,00 €
                Cheese      burger      steaks et cheddar                  

             28 Fish        Burger      Burger au poisson           5,00 €       +3,00 €
                                        pané, salade et                    
                                        sauce                              

             29 Panini 3    Panini      Cheddar, chèvre,            5,50 €        8,00 €
                Fromages                mozzarella                         

             30 Panini      Panini      Raclette, lardon,           5,50 €        8,00 €
                Savoyard                mozzarella                         

             31 Panini      Panini      Sauce curry, poulet,        5,50 €        8,00 €
                Indien                  mozzarella                         

             32 Panini      Panini      Sauce andalouse,            5,50 €        8,00 €
                Oriental                poulet, mozzarella                 

             33 Milkshake   Dessert /   Milkshake au choix :        5,00 €           ---
                            Boisson     KitKat, Kinder                     
                                        Bueno, Oreo, fraise,               
                                        etc.                               

             34 Panini      Dessert     Panini chaud garni          4,00 €           ---
                Nutella                 uniquement de pâte à               
                                        tartiner                           
                                        chocolat-noisette.                 
                                        Pas de banane.                     

             35 Tiramisu au Dessert     Tiramisu individuel,        3,50 €           ---
                choix                   parfum au choix                    

             36 Tarte au    Dessert     Part triangulaire           3,50 €           ---
                Daim                    fine, couches                      
                                        croustillantes /                   
                                        biscuitées, caramel                
                                        et chocolat au lait                
                                        avec éclats                        
                                        croquants sur le                   
                                        dessus                             

             37 Canette 33  Boisson     Boisson 33 cl.              1,50 €           ---
                cl                      Exemples de visuels                
                                        : Coca-Cola, Oasis,                
                                        Orangina                           

             38 Bouteille   Boisson     Grande bouteille de         3,50 €           ---
                1,5 L                   boisson. La carte                  
                                        papier indique 1,5 L               

             39 Menu enfant Menu enfant 1 choix parmi Cheese           ---        6,00 €
                                        Burger, Nuggets ×4                 
                                        ou Mini Tacos + 1                  
                                        Capri-Sun + 1 petite               
                                        frite + 1 surprise                 
  --------------------------------------------------------------------------------------

------------------------------------------------------------------------

## 4. Détails visuels importants déjà validés

### #7 --- Biggy

Le Biggy possède une **tranche de pain intermédiaire entre les deux
steaks**. Ne pas le représenter comme un simple double cheeseburger.

### #8 --- Chicken

Le poulet / les tenders doivent se trouver **sous la salade** dans la
représentation visuelle.

### #9 --- Country Chicken

La composition validée contient des **tenders** ainsi qu'une **galette
de pomme de terre**.

### #10 --- Chicken Beef

Le produit combine **poulet pané/tender + steak de bœuf**.

### #13 --- Wrap Country

Le wrap est plus volumineux que les autres wraps et contient notamment
tenders + galette de pomme de terre.

### #33 --- Milkshake

Le contenant doit rester **neutre**, sans faux nom de restaurant ou faux
logo imprimé dessus.

Des garnitures peuvent être présentes : chantilly, chocolat, biscuit,
sauce, etc.

### #34 --- Panini Nutella

Uniquement pâte à tartiner chocolat-noisette.

**Ne pas ajouter de banane.**

### #36 --- Tarte au Daim

La référence visuelle validée est une **part triangulaire assez fine**,
avec :

-   dessus chocolat au lait ;
-   petits éclats croquants ;
-   couche caramel ;
-   couches fines croustillantes / biscuitées.

Ce n'est pas un cheesecake épais.

### #37 --- Canettes

Visuel catalogue possible avec trois exemples :

-   Coca-Cola ;
-   Oasis ;
-   Orangina.

### #38 --- Grandes bouteilles

La carte papier indique **1,5 L à 3,50 €**.

Attention : un visuel généré précédemment affichait 1,05 L. **Pour les
données métier, conserver 1,5 L**, sauf décision ultérieure explicite.

### #39 --- Menu enfant

Composition exacte :

-   **1 choix** parmi :
    -   Cheese Burger ;
    -   Nuggets ×4 ;
    -   Mini Tacos ;
-   **1 Capri-Sun** ;
-   **1 petite frite** ;
-   **1 surprise**.

------------------------------------------------------------------------

## 5. Organisation recommandée dans l'application

Catégories proposées :

``` ts
type ProductCategory =
  | "burgers"
  | "wraps"
  | "menus"
  | "chicken"
  | "snacks"
  | "paninis"
  | "desserts"
  | "boissons"
  | "menu-enfant";
```

Ordre d'affichage recommandé :

1.  Burgers
2.  Wraps
3.  Menus
4.  Chicken / Buckets
5.  Snacks
6.  Paninis
7.  Desserts
8.  Boissons
9.  Menu enfant

------------------------------------------------------------------------

## 6. Règles de prix

Stocker les prix sous forme numérique, jamais sous forme de chaîne
formatée.

Exemple :

``` ts
{
  price: 6.5,
  menuPrice: 8.5
}
```

Le formatage `6,50 €` doit être effectué uniquement dans l'interface.

Pour les références **22 à 28**, la mention `+3 €` signifie que la
transformation / formule menu ajoute 3 € au prix du produit.

------------------------------------------------------------------------

## 7. Gestion des formules

Un produit pouvant être commandé seul ou en menu doit exposer clairement
les deux choix.

Exemple :

``` ts
{
  id: 4,
  name: "Bacon",
  price: 6.5,
  menuPrice: 8.5
}
```

Les menus M1 à M6 sont au contraire des **produits composés autonomes**
et doivent conserver leur propre identifiant.

------------------------------------------------------------------------

## 8. Structure de données recommandée

Fichier recommandé :

``` text
src/data/products.ts
```

Structure possible :

``` ts
export interface Product {
  id: number;
  slug: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number | null;
  menuPrice: number | null;
  image: string;
  options?: ProductOption[];
}
```

Les données doivent être centralisées. Éviter de recopier les prix et
descriptions directement dans plusieurs composants React / React Native.

------------------------------------------------------------------------

## 9. Recherche d'un visuel

Pour retrouver l'image correspondant à un produit :

1.  rechercher son **ID** dans ce document ;
2.  récupérer son slug ;
3.  charger l'image portant le même préfixe numérique.

Exemple :

``` text
ID 29
→ Panini 3 Fromages
→ assets/products/29-panini-3-fromages.png
```

Ainsi, lorsqu'une modification concerne « produit 29 », il n'y a aucune
ambiguïté.

------------------------------------------------------------------------

## 10. Points à ne pas inventer

Certaines informations du menu papier restent peu détaillées.

Claude ne doit pas inventer :

-   les sauces lorsqu'elles ne sont pas clairement précisées ;
-   les grammages non indiqués ;
-   les allergènes ;
-   les calories ;
-   la disponibilité réelle ;
-   les suppléments non présents dans la carte ;
-   les parfums complets de milkshake/tiramisu si la liste exacte n'est
    pas disponible ;
-   les choix exacts de boissons au-delà des exemples visibles.

Si une donnée nécessaire au développement manque, créer une valeur
temporaire clairement identifiée ou demander confirmation plutôt que
modifier silencieusement le catalogue.

------------------------------------------------------------------------

## 11. Résumé des références

-   **1--10** : burgers principaux
-   **11--13** : wraps
-   **14--19** : menus M1 à M6
-   **20--21** : Chicken Buckets
-   **22--25** : chicken / snacks
-   **26--28** : petits burgers / Fish
-   **29--32** : paninis
-   **33--36** : milkshake et desserts
-   **37--38** : boissons
-   **39** : menu enfant

**Total : 39 références.**

------------------------------------------------------------------------

## 12. Instruction à Claude

Avant de coder ou modifier une fonctionnalité liée au catalogue Burger
Factory :

1.  consulter ce fichier ;
2.  identifier le produit par son ID ;
3.  respecter son nom, sa composition et son prix ;
4.  utiliser l'image correspondant au même ID ;
5.  ne pas modifier la numérotation ;
6.  ne pas inventer d'information métier absente ;
7.  garder les données du catalogue centralisées ;
8.  séparer données métier, composants UI et logique panier/commande.

Ce document doit rester synchronisé avec toute modification future du
menu.
