# Multi-Field Sorting
## Sorting in a Nutshell
Greetings, fellow data enthusiasts! If you're perusing this, chances are you're no stranger to the enchanting world of sorting. Sorting is the art of meticulously arranging data in accordance with specific criteria. Most programming languages boast a trusty built-in function to tidy up unruly lists of data.

Picture this: you've got an array of numbers `[1, 2, 4, 8, 1, 6, 3, 2, 6, 4]` at your disposal. Now, when we talk about sorting (and we'll stick with the basic ascending order for now), this merry mishmash transforms into the orderly ensemble `[1, 1, 2, 2, 3, 4, 4, 6, 6, 8]`. In this case, the magic of sorting unfolds because you can discern which number plays second fiddle to another. In mathematical lingo, when handed two different real numbers, you can confidently declare one as the 'lesser' or 'greater' of the pair.

## The Challenge of Multiple Fields
Now, let's add a pinch of complexity to the mix, shall we? Enter complex numbers, the tricksters with not one but two components. Comparing two complex numbers isn't a walk in the park. Sure, you could measure their distance from the origin as a measure, but then you're neglecting the all-important angle! Once multiple fields come into play during sorting, devising a comparison algorithm becomes a bit of a head-scratcher.

## Taming the String Symphony
Strings, oh sweet strings! Sorting these enchanting sequences of characters is a whole other ball game. After all, unlike a single character comparison where `'a'` graciously concedes to `'b'`, and `'b'` yields to `'c'`, strings are composed of myriad characters. But fret not, for you can indeed sort strings, which are essentially multi-field entities. We employ the magical lexicographic ordering method. In the realm of Python, you can even put two tuples of multiple numbers (or should we say, multiple fields) in the ring, and Python will referee the match using lexicographical rules.

Ah, the whimsical world of lexicographical sorting! But beware, for even this enchanting method has its quirks. Picture this scenario: you've got a trio of data rows, each a splendid composition of three distinct fields:

| Name | Field1 | Field2 | Field3 |
|------|:------:|:------:|:------:|
| Row1 |    1   |    3   |    3   |
| Row2 |    2   |    2   |    1   |
| Row3 |    3   |    1   |    2   |

Now, take a gander at this data. It's been lexicographically sorted already (`[Row1, Row2, Row3]`, from smaller to larger, as tradition dictates). But here's the catch: lexicographical sorting, in its boundless wisdom, chose to pay attention solely to the first column. Why, you ask? Well, that's because all the values in the first column are different, and lexicographical sorting can be a bit single-minded like that. It never deigned to glance at the second or third column. In reality, if we scrutinize the data closely, we'd spot a curious detail—there are not one, but two delightful 3s in `Row1` alone! With a whopping **two** of the largest elements, one might naturally assume it should occupy the coveted last spot in our sorted list. Alas, reality has other plans.

## A Tale from the Past
A few years back, I embarked on the grand adventure of house hunting. Now, as anyone in this pursuit knows, there are a multitude of factors to consider. More square footage is certainly enticing, but a lower price tag has its own undeniable allure. To select the ideal abode, one must take all these facets into account—I've always been a tad algorithmically inclined, you see. It was during this house-hunting odyssey that a peculiar notion dawned upon me: a novel approach to sorting multi-field data, one that would cast its discerning eye upon every single field. Now, I won't claim to be the trailblazer of this method, for the world of algorithms is vast and full of mysteries. Nevertheless, I've yet to stumble upon this method in my search. In the end, I confess, I did not employ this algorithm in my house-hunting escapade. I simply followed my instincts and chose what felt right after a thorough search.

Several months ago, I found myself faced with the task of presenting a list of data, for the purpose of this document, let's assume these were products, on a website. These data points had the potential to be sorted using various criteria, such as customer ratings or prices. However, my default preference was to arrange them based on relevance. It marked the inaugural occasion where I embarked on the journey of crafting code for this very algorithm—sorting by relevance, considering all the facets. But as it often goes, it was just work.

Fast forward to just a few days ago, and I found myself on the quest to purchase some products online. After making a few selections, I yearned to pinpoint the cream of the crop, the ultimate gem among them. It was during this juncture that I wrote the code residing in this repository, intended for personal use. And then, a decision crystallized—I would make this code publicly available, here. In the end, I did succeed in identifying the best product through my sorting method, although I must confess that, ultimately, I opted for an entirely different product, one that hadn't even crossed my initial considerations.

## The Code in Question
The implementation is available in both Python and TypeScript. It expects a dictionary as input. The keys of this dictionary can represent the data itself or an ID corresponding to the data (in the case of TypeScript). The values of the dictionary constitute a list of numbers, one for each field. Importantly, the code presupposes that each value in the list is of equal length. In return, it graciously furnishes you with a sorted list of the keys. It is essential to note that the implementation contained herein modifies the input dictionary to store intermediate results. If you choose to employ this algorithm, it may be prudent to tailor it to your specific use case—perhaps by employing different data structures or adapting to varying field structures, among other potential refinements.

To deploy the algorithm with the above dataset provided, you can proceed as follows:

```python
>>> multi_field_sort({
  'Row1': [1, 3, 3],
  'Row2': [2, 2, 1],
  'Row3': [3, 1, 2]
})
['Row2', 'Row3', 'Row1']
```

Remarkably, `Row1` indeed finds itself at the tail end of the sorted list, as discussed previously. It's worth noting that this algorithm remains indifferent to the actual values residing within the fields. Even if the first field of `Row3` were to sport a hefty value like 1000 (far surpassing the humble 3), it would still not secure the coveted last position in the sorted hierarchy.

## The algorithm
Allow me to elucidate the inner workings of this algorithm through a delightful example. Picture this: a snippet of the product list I recently persued.

| Name   | Warranty |   Review  | Rating | Price |
|--------|:--------:|:---------:|:------:|:-----:|
| Brand1 |     3    |    good   |   4.3  |  206  |
| Brand2 |     1    | excellent |   4.1  |  129  |
| Brand3 |     1    |    good   |   4.2  |  172  |
| Brand4 |     5    | excellent |   4.0  |  104  |

Now, let's embark on this algorithmic odyssey step by step:

1. **Warranty**: Since the warranty values are already integers, there's no need for transformation.
2. **Review**: This field comprises string values, so we'll perform a subtle metamorphosis. *Good* shall be bestowed with the numerical honor of 1, while *excellent* shall ascend to 2, all due to the hierarchy of *good* being deemed lesser than *excellent*.
3. **Rating**: While the rating is a float, we'll err on the side of caution and multiply it by 10, thus rendering it an integer to avoid any pesky floating point shenanigans.
4. **Price**: Price, unlike its counterparts, thrives on the principle of lower being better. So, we shall negate each price value to reverse the order.

Now, behold the values in their transformed (in brackets) glory:

| Name   | Warranty |     Review    |  Rating  |    Price   |
|--------|:--------:|:-------------:|:--------:|:----------:|
| Brand1 |   3 (3)  |    good (1)   | 4.3 (43) | 206 (-206) |
| Brand2 |   1 (1)  | excellent (2) | 4.1 (41) | 129 (-129) |
| Brand3 |   1 (1)  |    good (1)   | 4.2 (42) | 172 (-172) |
| Brand4 |   5 (5)  | excellent (2) | 4.0 (40) | 104 (-104) |

With these transformed values, we can now assign ranks (in brackets) to each column. The smallest value will earn the rank of 1, and subsequent values will ascend in rank.

| Name   | Warranty |     Review    |  Rating |  Price  |
|--------|:--------:|:-------------:|:-------:|:-------:|
| Brand1 |   3 (2)  |    good (1)   | 4.3 (4) | 206 (1) |
| Brand2 |   1 (1)  | excellent (2) | 4.1 (2) | 129 (3) |
| Brand3 |   1 (1)  |    good (1)   | 4.2 (3) | 172 (2) |
| Brand4 |   5 (3)  | excellent (2) | 4.0 (1) | 104 (4) |

But hold on! Each column has a different number of ranks, so we must harmonize them. We'll do this by normalizing the ranks of each column—dividing them by the maximum rank within that column. This recalibration will bring all ranks into the range of 0 (exclusive) to 1 (inclusive).

| Name   |    Warranty    |        Review       |      Rating      |       Price      |
|--------|:--------------:|:-------------------:|:----------------:|:----------------:|
| Brand1 | 3 (2/3 = 0.67) |   good (1/2 = 0.5)  |   4.3 (4/4 = 1)  | 206 (1/4 = 0.25) |
| Brand2 | 1 (1/3 = 0.33) | excellent (2/2 = 1) |  4.1 (2/4 = 0.5) | 129 (3/4 = 0.75) |
| Brand3 | 1 (1/3 = 0.33) |   good (1/2 = 0.5)  | 4.2 (3/4 = 0.75) |  172 (2/4 = 0.5) |
| Brand4 |   5 (3/3 = 1)  | excellent (2/2 = 1) | 4.0 (1/4 = 0.25) |   104 (4/4 = 1)  |

Now, we face the thrilling challenge of combining a slew of numbers, all confined within the bounds of 0 to 1, and still managing to keep the result within the same cherished interval. How, you ask? Well, it's as simple as multiplication! We shall multiply all the normalized ranks within each row to create the crowning glory—the final rank.

| Name   |    Warranty    |        Review       |      Rating      |       Price      |  Rank  |
|--------|:--------------:|:-------------------:|:----------------:|:----------------:|:------:|
| Brand1 | 3 (2/3 = 0.67) |   good (1/2 = 0.5)  |   4.3 (4/4 = 1)  | 206 (1/4 = 0.25) |  0.083 |
| Brand2 | 1 (1/3 = 0.33) | excellent (2/2 = 1) |  4.1 (2/4 = 0.5) | 129 (3/4 = 0.75) |  0.125 |
| Brand3 | 1 (1/3 = 0.33) |   good (1/2 = 0.5)  | 4.2 (3/4 = 0.75) |  172 (2/4 = 0.5) | 0.0625 |
| Brand4 |   5 (3/3 = 1)  | excellent (2/2 = 1) | 4.0 (1/4 = 0.25) |   104 (4/4 = 1)  |  0.25  |

And there you have it! The final rank becomes our guiding light to sort this data:

    Brand3, Brand1, Brand2, Brand4
    Brand4 is the best!

## In Summation

And thus, we draw the curtains on this narrative. In summary, what we've unveiled is a humble algorithm—a mere quirk in the vast tapestry of computational methodologies. Perhaps, you might find it lying dormant in your toolkit someday, awaiting its moment of glory. Or maybe not, for even I, the curator of this peculiar creation, found myself relegating it to the annals of digital obscurity on two separate occasions when the sorting stars failed to align. 

But fear not, for it remains a testament to the ceaseless exploration of the computational cosmos—a whimsical creation, cool and unassuming, patiently awaiting its turn in the spotlight.