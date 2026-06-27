---
publish: true
created: 2026-06-26
modified: 2026-06-27T22:27:57.283+05:30
tags:
  - AI
---

# Transformer Models

- Type of neural netrworks
- Reads input data all at once instead of piece by piece.
- Uses the attention mechanism to find which parts of the input matter most
- A Transformer model that has been trained on a very large set of text is called a Large Language Model or an LLM.

# Model Mechanism

## Tokenisation

- Raw text is broken into small pieces also called tokens.
- a token can be a whole word or a part of a word or even a punctuation mark
- list of all possible tokens is the model's vocabulary

## Context Window

- the amount of text in tokens that the model can remember at one time
- it works like a sliding window
- compute requirements: they scale quadratically with the length of a sequence.
- increasing context length can slow down outputs, as it computes the relationships between the next token and every single preceding token in the sequence

# Generation Controls

## Temperature

- changes how random or predictable the output is
- value usually goes from zero to one
- low temperature
  - Picks the most likely next word almost every time.
  - Steady but boring.
- High temperature.
  - explores less likely word choices
  - Creative but mistake-prone
- A high temperature makes outputs less determined by training data.

## Top-p

- Model lists many words and sorts them by probability
- finds the smallest group of top words whose combined chance adds up to p
- picks one word at random, weighed by their original chances

## Frequency Penalty

- controls the repetition of words or phrases
- value determines how strongly to avoid repeats

## Presence Penalty

- discourages the model from repeating ideas or words that have already been introduced
- differs from frequency penalty
  - frequency penalty: focuses on the repetition of words themselves (on the lexical side)
  - Presence Penalty: Focuses on concepts and ideas

## Stopping Criteria

- tells the model when to stop writing more text
- criteria
  - token count
  - Special stop sequences (JSON code blocks prompts with delimiters)
  - semantic stopping (completes a paragraph, finishes a function, etc )
  - Function Calling and Tool Use
  - Sampling based criteria

## Max length

- maximum number of tokens a language model can generate in one reply

# Model Families

## Open Weight Models

- Weights = trained parameters
- open Weight Models: Weights Are Shared With Everyone

## Closed-Weight Models

- weights are not shared with the public

# AI Agents Basics

## Streamed vs Unstreamed Responses

- streamed response - agent starts sending words as soon as it generates them.
  - feels fast
  - user can stop or change the request early
  - complex
- unstreamed response - waits until the whole answer is ready
  - simpler to implement
  - easier to cache or log
  - user has to wait
- key technologies enabling streaming
  - Server Sent Events or SSE
    - push updates to client in real time over a single HTTP connection
    - each chunk of data is a separate event
  - WebSockets
    - bi-directional communication channel
  - Asynchronous programming
    - Processes multiple client requests concurrently

## Reasoning vs Standard Models

- Standard models depend on patterns learned during training - often guess the next most likely word.
  - give an answer in one quick move
- Reasoning models break a task into clear steps and follow a line of logic
  - better to solve math problems, plan actions, and spot errors
  - takes more time and compute power

## Fine tuning vs Prompt Engineering

- fine tuning
  - training an existing model further with your own data to adapt to specific tasks
  - extra data, extra compute power, extra time
- Prompt Engineering
  - crafting better instructions or examples in the prompt itself
  - faster, cheaper, and safer

## Embeddings and Vector Search

- semantic similarity as perceived by humans is translated to proximity in vector space
- Embeddings: convert data into numeric vectors that can capture meaning.
- vector search: find items with similar embeddings

```
Documents → Embedding Model → Vectors → Vector Database
                                      ↓
User Query → Embedding Model → Vector Search → Results
```

## Basics of RAG

- retrieval-augmented generation
- letting models look things up before they reply
- combines text generation with real-time information retrieval
- instead of relying solely on training data, RIG actively fetches information from trusted sources
- # Transformer Models
- Type of neural netrworks
- Reads input data all at once instead of piece by piece.
- Uses the attention mechanism to find which parts of the input matter most
- A Transformer model that has been trained on a very large set of text is called a Large Language Model or an LLM.

# Model Mechanism

## Tokenisation

- Raw text is broken into small pieces also called tokens.
- a token can be a whole word or a part of a word or even a punctuation mark
- list of all possible tokens is the model's vocabulary

## Context Window

- the amount of text in tokens that the model can remember at one time
- it works like a sliding window
- compute requirements: they scale quadratically with the length of a sequence.
- increasing context length can slow down outputs, as it computes the relationships between the next token and every single preceding token in the sequence

# Generation Controls

## Temperature

- changes how random or predictable the output is
- value usually goes from zero to one
- low temperature
  - Picks the most likely next word almost every time.
  - Steady but boring.
- High temperature.
  - explores less likely word choices
  - Creative but mistake-prone
- A high temperature makes outputs less determined by training data.

## Top-p

- Model lists many words and sorts them by probability
- finds the smallest group of top words whose combined chance adds up to p
- picks one word at random, weighed by their original chances

## Frequency Penalty

- controls the repetition of words or phrases
- value determines how strongly to avoid repeats

## Presence Penalty

- discourages the model from repeating ideas or words that have already been introduced
- differs from frequency penalty
  - frequency penalty: focuses on the repetition of words themselves (on the lexical side)
  - Presence Penalty: Focuses on concepts and ideas

## Stopping Criteria

- tells the model when to stop writing more text
- criteria
  - token count
  - Special stop sequences (JSON code blocks prompts with delimiters)
  - semantic stopping (completes a paragraph, finishes a function, etc )
  - Function Calling and Tool Use
  - Sampling based criteria

## Max length

- maximum number of tokens a language model can generate in one reply

# Model Families

## Open Weight Models

- Weights = trained parameters
- open Weight Models: Weights Are Shared With Everyone

## Closed-Weight Models

- weights are not shared with the public

# AI Agents Basics

## Streamed vs Unstreamed Responses

- streamed response - agent starts sending words as soon as it generates them.
  - feels fast
  - user can stop or change the request early
  - complex
- unstreamed response - waits until the whole answer is ready
  - simpler to implement
  - easier to cache or log
  - user has to wait
- key technologies enabling streaming
  - Server Sent Events or SSE
    - push updates to client in real time over a single HTTP connection
    - each chunk of data is a separate event
  - WebSockets
    - bi-directional communication channel
  - Asynchronous programming
    - Processes multiple client requests concurrently

## Reasoning vs Standard Models

- Standard models depend on patterns learned during training - often guess the next most likely word.
  - give an answer in one quick move
- Reasoning models break a task into clear steps and follow a line of logic
  - better to solve math problems, plan actions, and spot errors
  - takes more time and compute power

## Fine tuning vs Prompt Engineering

- fine tuning
  - training an existing model further with your own data to adapt to specific tasks
  - extra data, extra compute power, extra time
- Prompt Engineering
  - crafting better instructions or examples in the prompt itself
  - faster, cheaper, and safer

## Embeddings and Vector Search

- semantic similarity as perceived by humans is translated to proximity in vector space
- Embeddings: convert data into numeric vectors that can capture meaning.
- vector search: find items with similar embeddings

```
Documents → Embedding Model → Vectors → Vector Database
                                      ↓
User Query → Embedding Model → Vector Search → Results
```

## Basics of RAG

- retrieval-augmented generation
- letting models look things up before they reply
- combines text generation with real-time information retrieval
- instead of relying solely on training data, RIG actively fetches information from trusted sources
  ![[_attachments/Pasted image 20260626161129.png]]

# AI Agents

- software that can
  - sense its surroundings
  - think about what it senses
  - act to reach a goal
    - act independently
    - goal set by human
- Key characteristics
  - reasoning: can analyze data and context to determine the best approach for achieving a goal
  - acting: can use tools, APIs, and other resources
  - iterating: Improve the output by learning from feedback or results

## Tools

![[_attachments/Pasted image 20260626161138.png]]

- extra skills or resources that can be called by AI agents
- example : API calculator, database translation engine, etc

## Example Use Cases

### Personal Assistant

- Daily Tasks:
  - Check Calendar
  - Set Reminders
  - Send Alerts
- read emails, highlight key points, draft replies

### code generation

### data analysis

### web scraping

### gaming/NPC

## Agent Loop

- cycle that keeps AI agent working towards a goal
  - first, it gathers data from tools, sensors, or memory
  - Next, it updates its internal state and decides what to do. ( perhaps using a reasoning step)
  - carries out the chosen action
  - checks the result and stores the information

### Thought Action Observation Cycle

- thought: The LLM decides what the next step should be
- Action: takes an action by calling the tools with the associated arguments
- observation: Model reflects on the response of the tool

### Perception / user input

- turn data into usable form
  - cleaning, translating, and resizing, etc

### Reason and Plan

- thinking before acting
- breaking Goal Into Smaller Steps

### Action / tool invocation

### Observation and Reflection

# AI Agents

- software that can
  - sense its surroundings
  - think about what it senses
  - act to reach a goal
    - act independently
    - goal set by human
- Key characteristics
  - reasoning: can analyze data and context to determine the best approach for achieving a goal
  - acting: can use tools, APIs, and other resources
  - iterating: Improve the output by learning from feedback or results

## Tools

- extra skills or resources that can be called by AI agents
- example : API calculator, database translation engine, etc

## Example Use Cases

### Personal Assistant

- Daily Tasks:
  - Check Calendar
  - Set Reminders
  - Send Alerts
- read emails, highlight key points, draft replies

### code generation

### data analysis

### web scraping

### gaming/NPC

## Agent Loop

- cycle that keeps AI agent working towards a goal
  - first, it gathers data from tools, sensors, or memory
  - Next, it updates its internal state and decides what to do. ( perhaps using a reasoning step)
  - carries out the chosen action
  - checks the result and stores the information

### Thought Action Observation Cycle

- thought: The LLM decides what the next step should be
- Action: takes an action by calling the tools with the associated arguments
- observation: Model reflects on the response of the tool

### Perception / user input

- turn data into usable form
  - cleaning, translating, and resizing, etc

### Reason and Plan

- thinking before acting
- breaking Goal Into Smaller Steps

### Action / tool invocation

### Observation and Reflection
