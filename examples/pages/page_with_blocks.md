- # Page with Blocks and References
- In Logseq, everything is a block
- Each block has a unique ID that can be referenced
- ## Block References
- This is a block that will be referenced later
  id:: 64f8a1c9-8e3e-4a57-a0f7-cb3619102244
- Here I'm referencing the block above: ((64f8a1c9-8e3e-4a57-a0f7-cb3619102244))
- ## Block Properties
- Blocks can have their own properties
  collapsed:: true
  id:: 64f8a1c9-8e3e-4a57-a0f7-cb3619102245
  - This block is collapsed by default
  - But it contains nested content
- Here's another block with properties
  heading:: true
  id:: 64f8a1c9-8e3e-4a57-a0f7-cb3619102246
  - This is treated as a heading
- ## Block Embeds
- You can embed an entire block including its children
  - This is useful for reusing content
- {{embed ((64f8a1c9-8e3e-4a57-a0f7-cb3619102245))}}
- ## Queries
- Logseq supports queries to find blocks
- ```query
  {
    :title "All TODO items"
    :query [:find (pull ?b [*])
            :where
            [?b :block/marker ?marker]
            [(contains? #{"TODO" "DOING"} ?marker)]]
  }
  ```