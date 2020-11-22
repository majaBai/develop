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
    1） git add.  和 git add --all 的区别：
        首先， 在 git 2.XX 版本前，git add. 不会添加删除的文件到缓存区；但是更高版本的 git 已经不存在这个区别；
        其次，git add . 這個指令會把目前當下這個目錄，以及它的子目錄、子子目錄、子子子目錄…裡的異動全部加到暫存區，但在這個目錄的以外的就不歸它管了。
              而 git add --all 指令就沒這個問題，這個指令不管在專案的哪一層目錄執行，效果都是一樣的，在這個專案裡所有的異動都會被加至暫存區。
    2） git commit -m 'some comments' 会把缓存区的内容提交到仓库（仓库在本地还是远程呢？？本地）
        通过 add - commit 指令 git 在背后做了什么？

                add                             commit
        工作区 =========> 缓存区(staging area) ==========> 仓库(repository)

        git add -> git commit -m 可合并为 git commit -a -m 这样就表示 commit 之前先让 git add

    3) git log
        git log --oneline --graph 更精简的查看日志
        git log --oneline --author="Sherly" 指定作者
        git log --oneline --grep="xxx"  可以從 Commit 訊息裡面搜尋符合 xxx 的內容
        git log -S "xxx" 可以搜尋在所有 Commit 的檔案中，哪些符合特定條件的
        git log --oneline --since="9am" --until="12am" 指定时间

    4) git rm -f xxx 强制删除已经 add 了但还未 commit 的文件
       git rm xxx 删除已经 commit 的文件
       git rm xxx --cached 并不是真的删除文件，而是让文件 xxx 脱离 git 的管控

   5) 使用 rm 删除文件，但还未 add，可使用git checkout xxx.txt 恢复




*/