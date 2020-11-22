/*
1. git 和 gitHub 的区别：
    git 是一个版本控制软件，GitHub 是一个商业网站，GitHub 的本质是一个 Git 服务器

2. git 优点：
    开源
    分布式系统：在没有网络时也可以正常使用 git，等有网络后再进行同步

3. 版本管理方式：保存每个版本的快照
                 在每次版本變化的時候，Git 會更新並記錄整個目錄跟檔案的樹狀結構。

4. 在 git 命令行中操作文件的指令：
    ls 列出所有文件、目录
    touch xxx 新增文件
    mkdir 新增目录
    mv  修改文件
    echo 'some content'> xxx.txt 在某个 txt 文件中添加some content
    rm xxx.txt 移除文件
    cp a.txt b.txt 将文件 a 的内容复制到文件 b，如果文件 b 不存在，则新建

    pwd 当前目录
    cd xxx 切换目录


5. git指令：
    1)  git add.  和 git add --all 的区别：
        首先， 在 git 2.XX 版本前，git add. 不会添加删除的文件到缓存区；但是更高版本的 git 已经不存在这个区别；
        其次，git add . 這個指令會把目前當下這個目錄，以及它的子目錄、子子目錄、子子子目錄…裡的異動全部加到暫存區，但在這個目錄的以外的就不歸它管了。
              而 git add --all 指令就沒這個問題，這個指令不管在專案的哪一層目錄執行，效果都是一樣的，在這個專案裡所有的異動都會被加至暫存區。

        git add -p xxx.txt 添加 xxx 文件的部分内容进缓冲区（输入此命令会出现一个编辑框，可选择要添加的部分）


    2)  git commit -m 'some comments' 会把缓存区的内容提交到仓库（仓库在本地还是远程呢？？本地）
        通过 add - commit 指令 git 在背后做了什么？

                add                             commit
        工作区 =========> 缓存区(staging area) ==========> 仓库(repository)

        git add -> git commit -m 可合并为 git commit -a -m 这样就表示 commit 之前先让 git add

    3) git log
        git log --oneline --graph 更精简的查看日志
        git log -p xxx.txt 查看特定某个文件的详细记录
        git log --oneline --author="Sherly" 指定作者
        git log --oneline --grep="xxx"  可以從 Commit 訊息裡面搜尋符合 xxx 的內容
        git log -S "xxx" 可以搜尋在所有 Commit 的檔案中，哪些符合特定條件的
        git log --oneline --since="9am" --until="12am" 指定时间

    4) git rm -f xxx 强制删除已经 add 了但还未 commit 的文件
       git rm xxx 可以删除已经 commit 的文件(此命令 == rm xxx.txt -> git add -> git commit)
       git rm xxx --cached 并不是真的删除文件，而是让文件 xxx 脱离 git 的管控
       rm xxx.txt 删除文件，但要使用 git add -> git commit 来记录这次追踪

   5)  恢复删除的文件 git checkout
        git checkout branchName 的時候，Git 會切換到指定的分支，但如果後面接的是檔名或路徑，Git 則不會切換分支，而是把檔案從 .git 目錄裡拉一份到目前的工作目錄。
        更精準的來說，這個指令會把暫存區（Staging Area）裡的內容或檔案，拿來覆蓋工作目錄（Working Directory）的內容或檔案。
        所以當在上面執行 git checkout welcome.html 或 git checkout . 的時候，它會把 welcome.html 這個檔案，或是當下目錄所有檔案回復到上一次 Commit 的狀態。

        如果 git checkout HEAD~2 welcome.html 這樣就會拿距離現在兩個版本以前的那個 welcome.html 檔案來覆蓋現在的工作目錄裡的 welcome.html 檔案，但要注意的是，這同時也會更新暫存區的狀態喔。
            git checkout HEAD~2 . 拿距離現在兩個版本以前的檔案來覆蓋現在工作目錄的檔案，同時也更新暫存區裡的狀態


      使用 rm 删除文件，但还未 add，可使用git checkout xxx.txt 恢复
      使用 git rm 删除的文件， 首先 git restore --staged xxx.txt -> git checkout xxx.txt 恢复

    6) git mv a.txt b.txt 将 a.txt 重命名为 b.txt

    7) 要修改 Commit 紀錄有好幾種方法：
        a. 把 .git 目錄整個刪除（會把該專案所有的 Git 紀錄全部清掉，除非必要，不要輕易使用）。
        b. 使用 git rebase 來修改歷史。
        c. 先把 Commit 用 git reset commitId 拆掉，整理後再重新 Commit。
            注意：不管是用什麼模式進行 Reset，Commit 就是 Commit，並不會因為你 Reset 它然後就消失了
            git reset 有三个参数可选，他们會決定「Commit 拆出來的那些檔案何去何從」
                模式	              mixed 模式（默认）	soft 模式	    hard 模式
            Commit 拆出來的檔案	       丟回工作目錄	        丟回暫存區	     直接丟掉

            使用 git reset commitId 后 HEAD 指针会指向 commitId 所在的 commit; 相应的文件内容也会变化。
            使用 git reset commitID --hard 或者 git reset HEAD~前几个Commit --hard 拆掉commit后，可以使用 git reflog 来查看所有commit记录，
            获取拆掉的 commit id, 并在需要时进行恢复

        d. 使用 --amend 參數來修改最後一次的 Commit。
            git commit --amend --no-edit 表示该次commit没有内容，提交的内容会归并到上一次commit中

       修改 commit 记录时，git会将其看做时一次的新的 commit，会生成新的 SHA-1 值；儘量不要在已經 Push 之後再修改 commit

    8) 追加文件到最近一次commit中
       方法1： git reset
       方法2：在commit 新文件时使用 git commit --amend --no-edit

    9) 新增文件夹
        請記得一件很重要的觀念，就是 Git 在計算、產生物件的時候，是根據「檔案的內容」去做計算的，所以光是新增一個目錄，Git 是沒辦法處理它的。
        空的目錄無法被提交！
        解决方案：慣例上可以放一個名為 “.keep” 或 “.gitkeep” 的空檔案，讓 Git 能「感應」到這個目錄的存在（windows上貌似不行，可在新建的目录下添加一个readme.txt, 确保文件中有内容）

    10) .gitignor 忽略不需要进行版本管理的文件

    11) git blame xxx.txt 可以查看谁动过xxx.txt

    12) cat .git/HEAD （ref: refs/heads/branch1  获取当前指针指向哪儿）
        通过 cat .git/refs/heads/branch1 获取分支详细信息（其實所謂分支也不過就是一個 40 個字元的檔案罷了）
        HEAD 通常會指向目前所在的分支。不過 HEAD 也不一定總是會指向某個分支，當 HEAD 沒有指向某個分支的時候便會造成「detached HEAD」的狀態

6. git 分支
    1) git branch 和 git branch -a 分别用于查看本地和远程的所有分支

    2） git branch bName 新增分支
        git checkout -b bName 新增分支并切换到新分支

    3）为分支重命名
       git branch -m oldbNmae newName

    4) git branch -d branchName 删除分支 （使用 -D 參數可以強制把還沒合併的分支砍掉）

    5） git checkout branchName 切换分支

    6) 合并分支
       如果需要在 a 分支上合并 b 分支
       首先切换到 a 分支，其次使用 git merge b 进行合并

       合并过的分支是否删除都无所谓，因为合并后的分支已经获得了被合并分支的所有内容，那么被合并分支删除与否就看心情了

       如果在分支合并前，使用 git branch -d xxx 来删除 xxx 分支时，git 会发出警告；但如果确实要删除没有合并的分支，使用 git branch -D xxx
       如果使用 -D 删除了未合并的分支，后悔了，如何找回来呢？git branch newBname xxxdeleteId, 需要记住 xxxdeleteId 这个删除id值（如果没记住，用 git reflog 指令去翻翻看），
       从这里新建一个分支，这样新分支 newBname 就会获取之前未合并的分支内容

       取消合并：git reset HEAD^ --hard 一行指令，拆掉這個合併的 Commit 大家就會退回合併前的狀態

    7) 基于 rebase 进行合并
        從字面上來看，「rebase」是「re」加上「base」，翻成中文大概是「重新定義分支的參考基準」的意思。
        所謂「base」就是指「你這分支是從哪裡生出來的」，以上面這個例子來說，cat 跟 dog 這兩個分支的 base 都是 master。
        接著我們試著使用 git rebase 指令來「組合」cat 跟 dog 這兩個分支：
        $ git rebase dog
        大概就是「我，就是 cat 分支，我現在要重新定義我的參考基準，並且將使用 dog 分支當做我新的參考基準」的意思

        取消基于 rebase 的合并：
         1) 使用 git reflog 查看 HEAD 记录， 找到 Rebase 前的最後動作id
            $ git reset 最後動作id --hard
         2) 使用 git reset ORIG_HEAD --hard 輕鬆跳回 Rebase 前的狀態
           ORIG_HEAD 會記錄「危險操作」之前 HEAD 的位置。例如分支合併或是 Reset 之類的都算是所謂的「危險操作」。
           使用 Rebase 來合併分支的好處，就是它不像一般合併可能會產生額外的合併專用的 Commit，而且歷史順序可以依照誰 Rebase 誰而決定
           缺點就是它相對的比一般的合併來得沒那麼直覺，一個不小心可能會弄壞掉而且還不知道怎麼 Reset 回來，或是發生衝突的時候就會停在一半，對不熟悉 Rebase 的人來說是個困擾
    8) 解决合并冲突问题
        基本合并： 手动解决冲突 -> git add 冲突文件 -> git commit
        基于 rebase 的冲突： 手动解决冲突 -> git add 冲突文件 -> git rebase --continue

    9) 如果发生冲突是非文字文件，比如同名的图片
       决定使用哪张图片 git checkout --ours xxx.jpg 保留当前分支的图片
                        git checkout --theirs xxx.jpg 保留合并进来的图片

    10) 回到过去的某一个 commit 上重新开一个新分支
        首先可通过 git log 查看你想定位的 commit id
        git branch newBranch commitId  基于某个 commit 新开了一个分支
        git checkout -b newBranch commitId 基于某个 commit 新开了一个分支并切入新分支

    11) 修改历史 commit 信息
        $ git rebase -i commitId (-i 參數是指要進入 Rebase 指令的「互動模式」，而後面的 commitId 是指這次的 Rebase 指令的應用範圍會「從現在到 commitId 這個 Commit」
        這個指令會跳出一個 Vim 編輯器

    12) revert/ rebase / reset
        指令	改變歷史紀錄	                說明
        Reset	    是	            把目前的狀態設定成某個指定的 Commit 的狀態，通常適用於尚未推出去 (push) 的 Commit。
        Rebase	    是	            不管是新增、修改、刪除 Commit 都相當方便，用來整理、編輯還沒有推出去的 Commit 相當方便，但通常也只適用於尚未推出去的 Commit。
        Revert	    否	            新增一個 Commit 來反轉（或說取消）另一個 Commit 的內容，原本的 Commit 依舊還是會保留在歷史紀錄中。雖然會因此而增加 Commit 數，
                                    但通常比較適用於已經推出去的 Commit，或是不允許使用 Reset 或 Rebase 之修改歷史紀錄的指令的場合。
   13) tag 標籤
        通常在開發軟體有完成特定的里程碑，例如軟體版號 1.0.0 或是 beta-release 之類的，這時候就很適合使用標籤做標記
        $ git tag tagName commitId  为某个 commit 打上 tagName 标签
        $ git tag tagName 为当前所在的 commit 打上标签
        $ git tag tagName commitId -a -m "description for tag"  为某个 commit 打上 tagName 标签，并且 tag 带有description
        $ git tag -d tagName 删除 tagName 标签

    14） 当前在 a 分支，巩固走还未做完； 但需要紧急切换到 b 分支工作
         方法一: 使用 git stash 来保存 a 分支
                可以 stash 多份未完成的分支
                通过 $ git stash list 来查看所有 stash 分支
                通过 $ git stash pop someKey(比如 stash@{2}) 来弹出你想要的 stash 并套用在当前的分支, 斌删除 stash
                    $ git stash apply someKey(比如 stash@{2}) 将你想要的 stash 套用在当前的分支，但是不删除 stash
                通过 $ git stash drop someKey(比如 stash@{0}) 来删除某一个 stash
         方法二： 可以先 add ->  commit -m 'not finish' 做一个记号
                  然后处理完 b分支后，再切回到 a 分支，使用 $ git reset HEAD^ 把剛剛做一半的東西拆回來繼續做



*/