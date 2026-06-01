Run the full feature pipeline for: $ARGUMENTS

Execute these stages in order. Do not skip ahead. After each stage,
confirm the handoff file exists before starting the next.

For FRONTEND features:
1. Delegate to the `designer` subagent with the feature request.
   Wait for `.pipeline/design.md`.
2. If design has any flags or missing tokens, stop and show them to me.

For ALL features:
3. Delegate to the `planner` subagent with the feature request.
   Wait for `.pipeline/spec.md`.
4. If the spec has OPEN QUESTIONS, stop and show them to me. Otherwise
   delegate to the `coder` subagent. Wait for `.pipeline/changes.md`.
5. Delegate to the `tester` subagent. Wait for `.pipeline/test-results.md`.
   If tests failed, stop and show me the failures.
6. Delegate to the `reviewer` subagent. Show me `.pipeline/review.md`.

Report the final verdict. Do not merge anything. Leave the branch for
my morning review.