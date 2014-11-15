P0liped FF Detection
====================

**A small script detecting Firefox version.**

**Currently in beta stage - still testing few versions**

P0liped FF Detection uses feature detection and some resolved bugs to detect the proper Firefox version - no matter what the UserAgent string is.

It's perfect when you found a really annoying quirk (mostly in the layout engine, as usually it's much easier to handle the ones connected with the JavaScript engine). 
Although, I've just written "it's perfect" above, **it's not perfect**. **I don't recommend using it**. You should always perform feature detection and write your stylesheets/scripts properly with the newest web standards. If you do so, you shouldn't experience any inconveniences.
If you do and you still can't fix the bug in any relatively easy way, then think about using my tool. When you use it wisely, everything will be ok. You can also use it for gathering analytics data, to track which browsers hit your website etc.
As I said, use it only when everything you could rely on doesn't work.

**Remember, in most cases the fault isn't in the browser, but in your code.**

How does it work?
--
It uses one new feature/bug which appears in the XX version and higher (usually, but not always). There is usually a single test to detect it. However, I may add more (up to 4-5) tests alternatively if you report me bugs.
Also, I did tried to omit stuff you can (or could) turn on using flags in about:config
If you target only few versions, you can remove the other tests. You must leave the higher version. 
Example:
When you need to detect 15 version, you must leave the tests for 15 and 16.

A few words about bugs appearing in Firefox
--
[Here][bugtracker] there is a bug tracker, which contains all bugs fixed in the release you chose.
You can find here major bugs, but also the minor ones. If you find something resolved in that version, you should assume the previous ones are also buggy (to the version that buggy feature was implemented/changed).
How to find bugs? 
http://beta.elchi3.de/doctracker/#list=fx&version=22.0 - bugs resolved in 22 version

Usage
--
The size of minified and gzipped tool shouldn't exceed ~2-3 KB, so it's quite lightweight. I tried not to add many features to keep it tiny. However, I may add some more in the future when you report me some bugs.

Browser Compatibility
--
I tested the tool on all main releases starting from 2 to 33, including ESR. 
I still have to mantain some tests on versions like 3.5.18 or 20.0.0.0, because I always chose the latest one for the following release.
In browser that aren't in stable stream, it may return unexpected results (in 36 it returns 35, but 36 is not added to the list yet), but I'll keep updating it, so no worries.


[bugtracker]:http://beta.elchi3.de/doctracker/
