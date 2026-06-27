---
publish: true
created: 2026-06-26
modified: 2026-06-27T22:27:57.284+05:30
published: 2026-06-26
tags:
  - AI
stage: tended
draft: false
date: 2026-06-26
moc: false
pinned: true
---

- Type of neural network
- CNNs have been really good for images, but there was nothing comparably good for language tasks
- RNNs were typically used to understand text -> sequential
  - Process one word at a time
  - Did not do well with large sequences of text
  - Hard to train since it could not be parallelised
- Transformers were developed in 2017 by Google researchers and University of Toronto
- Initially designed for translation
- Can be parallelised -> so can be trained in huge amount of data

#### How do transformers work (high-level)?

1. Positional encoding
   - Encode word order in the data instead of the structure of network
   - When training on text data -> learns how to interpret these positional encodings
2. Attention
   - Neural network structure that allows a text model to look at every single word in the original sentence when making a decision about translating a word in the output sentence
   - Knowing which words to 'attend' to -> learnt over time from looking at a lot of data
3. Self-attention
   - Allows a neural network to understand a word in the context of the words around it -> building up an understanding of the internal representation of language
   - Helps neural network disambiguate words
     Source : https://youtu.be/SZorAJ4I-sA?si=D3H0S3HyCFzHcl5Z

#### Inside a transformer

1. Tokenisation
2. Tokens are associated with vectors -> list of numbers that encode meaning -> coordinates with similar meaning would be closer to each other in the vector space
3. Attention Block -> vectors talk to each other and pass information back and forth to update their values. This is responsible for figuring out :
   - Which words in the context are relevant to update the meanings of which other words
   - How exactly these meanings should be updated
4. Multilayer Perceptron / Feedforward layer : Vectors dont talk to each other, they go through the same operation in parallel -> Like asking a list of questions to the vectors and updating them based on answers
5. Repeats the attention and MLP layers
6. In the end, all the essential meaning would be baked into the last vector in the sequence -> Produces probability distribution of all possible tokens that might come next
   Source : https://youtu.be/wjZofJX0v4M?si=VJ8Q0HtXG3RtV\_N-
